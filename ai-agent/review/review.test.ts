import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { answer, ask, emptyState, end, hint, localDay, plan, register, start, timestamp, type Answer, type ReviewState } from './review.ts';
import { mutate, readState, resumeTask, syncProgress } from './store.ts';

const now = timestamp('2026-10-22T12:00:00+08:00');
const later = (days: number) => new Date(now.getTime() + days * 86_400_000);
const progress = '# 学习进度\n\n更新时间：2026-10-22\n\n## 当前接续点\n\n' +
  '- 当前：M01 阶段 B\n- 未完成任务（未作答）：Trigram 题：today datawhale agent ___，按空格分词。\n' +
  '- 下一步：回答原题。\n\n## 模块状态\n\nM01 学习中；0 / 14\n\n' +
  '## 复习队列\n\n旧队列\n\n## 待解决问题\n\n链式法则待验证。\n';
const options = { module: 'M01' };
function stateWithTopics(count = 1): ReviewState {
  const state = emptyState();
  register(state, Array.from({ length: count }, (_, i) => ({
    id: `topic-${i}`, title: `知识点 ${i}`, module: 'M01', source: 'learning-records/0001.md',
    lastEvidenceDate: '2026-10-19', priorSummary: '历史简化题正确，迁移待验证', minutes: 2,
  })), now);
  return state;
}
function pending(state: ReviewState, topicId = 'topic-0', at = now) {
  start(state, options, at, resumeTask(progress));
  return ask(state, { topicId, prompt: '完整新语料与条件。请解释结果。', rubric: '须正确解释条件与分母' }, at);
}
function response(id: string, overrides: Partial<Answer> = {}): Answer {
  return { attemptId: id, answer: '原始独立作答', correct: true, assisted: false, feedback: '分母解释正确', ...overrides };
}
async function fixture() {
  const root = await mkdtemp(resolve(tmpdir(), 'learn-review-'));
  await mkdir(resolve(root, 'review'));
  await mkdir(resolve(root, 'learning-records'));
  await writeFile(resolve(root, 'PROGRESS.md'), progress);
  await writeFile(resolve(root, 'learning-records/0001.md'), '历史证据');
  return root;
}

test('迁移登记不补造历史评分；同日新证据不立即重复校准；plan 只读', () => {
  const state = stateWithTopics();
  register(state, [{ ...state.topics[0], id: 'today', lastEvidenceDate: '2026-10-22' }], now);
  const before = JSON.stringify(state);
  const result = plan(state, options, now);
  assert.deepEqual(result.selected?.map(t => t.id), ['topic-0']);
  assert.equal(result.selected?.[0].recall, null);
  assert.equal(state.events.length, 0);
  assert.equal(state.topics[0].card, null);
  assert.equal(JSON.stringify(state), before);
});

test('首次真实作答才建立 FSRS 状态；短间隔继续，长间隔到期', () => {
  const state = stateWithTopics();
  const question = pending(state);
  answer(state, response(question.id), now);
  end(state, false);
  assert.equal(state.events[0].grade, 'Good');
  assert.equal(state.events[0].durationEstimated, true);
  assert.equal(plan(state, options, now).decision, 'continue');
  const future = plan(state, options, later(365));
  assert.equal(future.decision, 'review');
  assert.equal(future.selected?.[0].kind, 'due');
  assert.ok(future.selected![0].recall! > 0 && future.selected![0].recall! < 0.9);
});

test('前置知识优先、预算有限；时间极少时允许直接续学', () => {
  const state = stateWithTopics(4);
  const result = plan(state, { ...options, prerequisiteIds: ['topic-3'] }, now);
  assert.equal(result.selected?.[0].id, 'topic-3');
  assert.ok(result.selected!.reduce((sum, topic) => sum + topic.minutes, 0) <= 5);
  assert.equal(result.remainingCount, 2);
  assert.equal(plan(state, { ...options, availableMinutes: 2 }, now).decision, 'continue');
});

test('已练知识在长间隔前可按前置关系提前检查；计划不改写到期日', () => {
  const state = stateWithTopics();
  const question = pending(state);
  answer(state, response(question.id, { effort: 'easy' }), now);
  end(state, false);
  const card = state.topics[0].card!;
  const due = card.due;
  assert.ok(timestamp(due) > later(1));
  assert.equal(plan(state, options, later(1)).decision, 'continue');
  const result = plan(state, { ...options, prerequisiteIds: ['topic-0'], nextSessionAt: later(365).toISOString() }, later(1));
  assert.equal(result.selected?.[0].kind, 'before-gap');
  assert.ok(result.selected![0].nextRecall! < 0.9);
  assert.equal(state.topics[0].card!.due, due);
});

test('跨天恢复原题和提示；提示后正确强制记为 Again', () => {
  let state = stateWithTopics();
  const question = pending(state);
  hint(state, { attemptId: question.id, text: '先限定分母范围', answerBeforeHint: '原错误答案' });
  hint(state, { attemptId: question.id, text: '先限定分母范围' });
  state = JSON.parse(JSON.stringify(state));
  const result = start(state, options, later(10), '另一份上下文');
  assert.equal(result.decision, 'resume-review');
  assert.equal(result.pending?.prompt, question.prompt);
  assert.equal(result.pending?.hints.length, 1);
  assert.equal(result.resumeTask, resumeTask(progress));
  answer(state, response(question.id), later(10));
  assert.equal(state.events[0].assisted, true);
  assert.equal(state.events[0].grade, 'Again');
  assert.equal(state.events[0].hints[0].answerBeforeHint, '原错误答案');
});

test('中断跨天后重新计入本日预算，原题与旧评分保留', () => {
  const state = stateWithTopics(4);
  const first = pending(state);
  answer(state, response(first.id, { durationMinutes: 3 }), now);
  const second = ask(state, { topicId: 'topic-1', prompt: '待答原题', rubric: '依据' }, now);
  start(state, { ...options, availableMinutes: 8 }, later(3), '');
  assert.equal(state.session!.spentMinutes, 0);
  assert.equal(state.session!.budgetMinutes, 2);
  assert.equal(state.session!.pending!.id, second.id);
  answer(state, response(second.id), later(3));
  assert.equal(plan(state, options, later(3)).decision, 'continue');
  assert.equal(state.events.length, 2);
});

test('未答、讲解、跳过不增加成绩；skip 后恢复原任务且本轮不再追问', () => {
  const state = stateWithTopics();
  pending(state);
  assert.throws(() => end(state, false), /未答题/);
  const result = end(state, true);
  assert.equal(result.resumeTask, resumeTask(progress));
  assert.equal(state.events.length, 0);
  assert.equal(state.topics[0].card, null);
  assert.equal(start(state, options, now, '').decision, 'continue');
  assert.equal(start(state, { ...options, force: true }, now, '').decision, 'review');
});

test('同一作答重试只记录一次，字段顺序不影响；冲突重试明确拒绝', () => {
  const state = stateWithTopics();
  const question = pending(state);
  const input = response(question.id);
  answer(state, input, now);
  const before = JSON.stringify(state);
  const reordered = Object.fromEntries(Object.entries(input).reverse()) as unknown as Answer;
  assert.equal(answer(state, reordered, later(1)).alreadyRecorded, true);
  assert.equal(JSON.stringify(state), before);
  assert.throws(() => answer(state, { ...input, answer: '另一份作答' }, now), /内容不一致/);
});

test('独立吃力正确为 Hard，错误为 Again；一轮中同一项不反复刷题', () => {
  for (const [correct, effort, expected] of [[true, 'hard', 'Hard'], [false, 'easy', 'Again']] as const) {
    const state = stateWithTopics();
    const question = pending(state);
    answer(state, response(question.id, { correct, effort }), now);
    assert.equal(state.events[0].grade, expected);
    assert.equal(plan(state, options, later(0.1)).decision, 'continue');
  }
});

test('缩短可用时间会缩小预算；跨日开启新回合，清除上轮预算消耗', () => {
  const state = stateWithTopics(4);
  const question = pending(state);
  answer(state, response(question.id, { durationMinutes: 4 }), now);
  assert.equal(start(state, { ...options, availableMinutes: 4 }, now, '').decision, 'continue');
  const next = start(state, options, later(1), '新学习断点');
  assert.equal(next.spentMinutes, 0);
  assert.equal(next.resumeTask, '新学习断点');
});

test('上海日期按时区边界判断；无效日期、无时区或倒序时间拒绝', () => {
  assert.equal(localDay(timestamp('2026-10-22T16:00:00Z')), '2026-10-23');
  assert.throws(() => timestamp('2026-10-22T12:00:00'), /带时区/);
  assert.throws(() => timestamp('2026-02-30T12:00:00+08:00'), /无效时间/);
  const state = stateWithTopics();
  assert.throws(() => register(state, [{ ...state.topics[0], id: 'bad', lastEvidenceDate: '2026-02-30' }], now), /日期/);
  assert.throws(() => plan(state, { ...options, nextSessionAt: later(-1).toISOString() }, now), /晚于现在/);
  const question = pending(state);
  assert.throws(() => answer(state, response(question.id), later(-1)), /早于出题/);
});

test('未答题不会被新题覆盖；超出预算或未知知识点不能出题', () => {
  const state = stateWithTopics();
  const question = pending(state);
  assert.throws(() => ask(state, { topicId: question.topicId, prompt: '另一题', rubric: '不同要求' }, now), /已有未答/);
  end(state, true);
  start(state, { ...options, force: true, availableMinutes: 1 }, now, '');
  assert.throws(() => ask(state, { topicId: question.topicId, prompt: '题', rubric: '要求' }, now), /预算/);
});

test('文件保存、重新加载、摘要同步可重复；课程状态和未完成任务逐字保留', async () => {
  const root = await fixture();
  try {
    await mutate(root, state => Object.assign(state, stateWithTopics()));
    const saved = await readState(root);
    assert.equal(saved.events.length, 0);
    const first = await readFile(resolve(root, 'PROGRESS.md'), 'utf8');
    assert.equal(resumeTask(first), resumeTask(progress));
    assert.equal(first.split('## 复习队列')[0], progress.split('## 复习队列')[0]);
    assert.equal(first.split('## 待解决问题')[1], progress.split('## 待解决问题')[1]);
    await syncProgress(root, saved);
    assert.equal(await readFile(resolve(root, 'PROGRESS.md'), 'utf8'), first);
    saved.topics[0].priorSummary = '原样保留 $& 与 $`、$\' 字符';
    await syncProgress(root, saved);
    const literal = await readFile(resolve(root, 'PROGRESS.md'), 'utf8');
    assert.ok(literal.includes(saved.topics[0].priorSummary));
    assert.equal((literal.match(/## 复习队列/g) ?? []).length, 1);
    await mutate(root, state => pending(state));
    const reloaded = await readState(root);
    assert.equal(plan(reloaded, options, later(5)).decision, 'resume-review');
    await writeFile(resolve(root, 'review/state.json.lock'), 'busy');
    await assert.rejects(mutate(root, () => undefined), /另一个复习写入/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('状态保存后摘要出错会明确报告，修复进度后 sync 可恢复且不丢评分', async () => {
  const root = await fixture();
  try {
    await writeFile(resolve(root, 'PROGRESS.md'), '# 意外缺少复习段\n');
    await assert.rejects(mutate(root, state => Object.assign(state, stateWithTopics())), /state.json 已保存/);
    assert.equal((await readState(root)).topics.length, 1);
    await writeFile(resolve(root, 'PROGRESS.md'), progress);
    await mutate(root, () => undefined);
    assert.match(await readFile(resolve(root, 'PROGRESS.md'), 'utf8'), /待闭卷校准/);
    await writeFile(resolve(root, 'review/state.json'), '{broken');
    await assert.rejects(readState(root));
    assert.equal(await readFile(resolve(root, 'review/state.json'), 'utf8'), '{broken');
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('CLI 隔离走完登记→开场→出题→提示→回答→结束，真实工作区保持不变', async () => {
  const root = await fixture();
  const liveRoot = fileURLToPath(new URL('../', import.meta.url));
  const before = await readFile(resolve(liveRoot, 'PROGRESS.md'), 'utf8');
  const runFile = promisify(execFile);
  async function run(command: string, input: object = {}) {
    const file = resolve(root, 'request.json');
    await writeFile(file, JSON.stringify(input));
    const result = await runFile(process.execPath, ['--import', 'tsx', fileURLToPath(new URL('./cli.ts', import.meta.url)),
      command, '--root', root, '--input', file, '--now', now.toISOString()], { cwd: fileURLToPath(new URL('./', import.meta.url)) });
    return JSON.parse(result.stdout);
  }
  try {
    await run('register', { topics: stateWithTopics().topics });
    assert.equal((await run('plan')).saved, false);
    assert.equal((await run('start')).result.decision, 'review');
    const question = (await run('ask', { topicId: 'topic-0', prompt: '原题与全部条件', rubric: '标准' })).result;
    await run('hint', { attemptId: question.id, text: '提示' });
    const result = await run('answer', response(question.id));
    assert.equal(result.result.event.grade, 'Again');
    assert.equal((await run('answer', response(question.id))).result.alreadyRecorded, true);
    assert.equal((await run('finish')).result.resumeTask, resumeTask(progress));
    assert.equal((await run('plan')).result.decision, 'continue');
    assert.equal(await readFile(resolve(liveRoot, 'PROGRESS.md'), 'utf8'), before);
    assert.equal((await readState(root)).events.length, 1);
  } finally { await rm(root, { recursive: true, force: true }); }
});
