import { open, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { randomUUID } from 'node:crypto';
import { check, emptyState, localDay, timestamp, type ReviewState } from './review.ts';

export async function readState(root: string): Promise<ReviewState> {
  let raw: string;
  try { raw = await readFile(resolve(root, 'review/state.json'), 'utf8'); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyState();
    throw error;
  }
  const state = JSON.parse(raw) as ReviewState;
  check(state.version === 1 && state.retention > 0 && state.retention < 1 &&
    Array.isArray(state.topics) && Array.isArray(state.events), '复习状态格式无效，请保留文件并检查，不能重置历史');
  return state;
}
export async function verifySource(root: string, source: string) {
  const file = resolve(root, source);
  const path = relative(root, file);
  check(path !== '..' && !path.startsWith(`..${sep}`) && file.endsWith('.md'), 'source 须指向 ai-agent 内的 Markdown 文件');
  await readFile(file, 'utf8');
}
export function resumeTask(progress: string): string {
  const section = progress.match(/^## 当前接续点\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1] ?? '';
  for (const label of ['未完成任务', '下一步']) {
    const field = section.match(new RegExp(`^- ${label}[^\\n]*(?:\\n(?!- |## )[^\\n]+)*`, 'm'))?.[0];
    if (field) return field;
  }
  return section.trim();
}
async function atomicWrite(path: string, content: string) {
  const temp = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, content, { flag: 'wx' });
    await rename(temp, path);
    check(await readFile(path, 'utf8') === content, `写入读回不符：${path}`);
  } finally {
    await unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}
function cell(value: string) { return value.replaceAll('|', '\\|').replace(/\s*\n\s*/g, ' '); }
function displayTime(value: string) {
  const date = timestamp(value);
  return `${localDay(date)} ${new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date)}`;
}
export function summary(state: ReviewState) {
  const rows = state.topics.map(topic => {
    const latest = state.events.filter(event => event.topicId === topic.id).at(-1);
    const result = latest ? `${!latest.correct ? '未能正确回忆' :
      latest.assisted ? '提示后完成，仍需独立验证' : '独立回忆正确'}；${latest.feedback}` : topic.priorSummary;
    const next = topic.card ? displayTime(topic.card.due) : `待闭卷校准${topic.legacyDue ? `（旧计划 ${topic.legacyDue}）` : ''}`;
    return `| ${cell(topic.title)} | ${topic.lastEvidenceDate} | ${cell(result)} | ${next} | [证据](${topic.source})；\`${topic.id}\` |`;
  });
  const pending = state.session?.pending;
  return [
    '## 复习队列', '', '<!-- adaptive-review:start -->',
    `由 [复习工具](review/README.md) 从 [算法状态](review/state.json) 生成。FSRS-6，目标保持率 ${state.retention * 100}%；时间为 Asia/Shanghai。`, '',
    '| 知识点 | 最近证据 / 检查日期 | 结果与证据范围 | 下次复习 | 依据 / ID |',
    '|---|---|---|---|---|', ...rows, '',
    pending ? `未答复习题已保存（\`${pending.id}\`），下次恢复原题；原学习断点继续保留在“当前接续点”。` : '当前没有未答的开场复习题。', '',
    '待校准项只登记已有证据，没有补造历史评分或精确复习时间。每次续学根据真实间隔、当前前置知识和预算重新选择；复习成绩与模块验收分别记录。',
    '<!-- adaptive-review:end -->', '',
  ].join('\n');
}
export async function syncProgress(root: string, state: ReviewState) {
  const path = resolve(root, 'PROGRESS.md');
  const before = await readFile(path, 'utf8');
  const section = /^## 复习队列\s*\n[\s\S]*?(?=^## |$(?![\s\S]))/m;
  check(section.test(before), 'PROGRESS.md 缺少“复习队列”，请检查后再同步');
  const after = before.replace(section, () => summary(state) + '\n');
  if (after !== before) {
    check(await readFile(path, 'utf8') === before, 'PROGRESS.md 刚被其他会话修改，请重试 sync');
    await atomicWrite(path, after);
  }
}
export async function mutate<T>(root: string, operation: (state: ReviewState) => T | Promise<T>) {
  const path = resolve(root, 'review/state.json');
  const lock = await open(`${path}.lock`, 'wx').catch(error => {
    if (error.code === 'EEXIST') throw new Error('另一个复习写入正在进行；请稍后重试。异常退出遗留锁时，先确认无运行中的写入再删除 review/state.json.lock');
    throw error;
  });
  try {
    const state = await readState(root);
    const result = await operation(state);
    await atomicWrite(path, JSON.stringify(state, null, 2) + '\n');
    try { await syncProgress(root, state); }
    catch (error) { throw new Error(`state.json 已保存；PROGRESS.md 摘要未同步，请运行 sync 重试：${(error as Error).message}`); }
    return { saved: true, summarySynced: true, result };
  } finally {
    await lock.close();
    await unlink(`${path}.lock`);
  }
}
