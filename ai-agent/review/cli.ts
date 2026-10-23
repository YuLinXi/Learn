import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { answer, ask, check, end, hint, plan, register, start, timestamp, type Answer, type Options, type Topic } from './review.ts';
import { mutate, readState, resumeTask, verifySource } from './store.ts';

const help = `Learn 学习前自适应复习（从根目录运行）
npm --prefix ai-agent/review run review -- <command> [--input JSON文件] [--now 带时区时间]

plan      只读判断（输入 module、availableMinutes、prerequisiteIds、nextSessionAt）
start     开始/恢复本轮开场复习，自动保存原学习断点
ask       保存一道题（topicId、prompt、rubric），返回 attemptId（结果中的 id）
hint      在展示提示前保存（attemptId、text，可附 answerBeforeHint）
answer    保存真实作答（attemptId、answer、correct、assisted、feedback，可附 effort、durationMinutes）
skip      跳过本轮复习，保持算法评分，恢复原任务
finish    结束开场复习，恢复原任务（未答题须先作答或明确 skip）
register  登记已获学习证据的知识点（topics 数组；只登记，不生成复习评分）
sync      从 state.json 修复/刷新 PROGRESS.md 的复习摘要

所有命令输出 JSON。--root 指向独立 ai-agent 目录，仅用于隔离测试。
详细数据结构与使用步骤见 ai-agent/review/README.md。`;

async function main() {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    input: { type: 'string' }, now: { type: 'string' }, root: { type: 'string' }, help: { type: 'boolean' },
  } });
  if (values.help || !positionals.length) { console.log(help); return; }
  const command = positionals[0];
  check(positionals.length === 1, '只接受一个 command');
  const root = values.root ? resolve(values.root) : fileURLToPath(new URL('../', import.meta.url));
  const now = values.now ? timestamp(values.now) : new Date();
  const input = values.input ? JSON.parse(await readFile(values.input, 'utf8')) : {};
  const progress = await readFile(resolve(root, 'PROGRESS.md'), 'utf8');
  const module = progress.match(/^- 当前：.*?\b(M\d{2}|A\d+)\b/m)?.[1];
  const options: Options = { module, ...input };
  if (command === 'plan') {
    console.log(JSON.stringify({ saved: false, result: { ...plan(await readState(root), options, now),
      currentResumeTask: resumeTask(progress) } }, null, 2));
    return;
  }
  check(['start', 'ask', 'hint', 'answer', 'skip', 'finish', 'register', 'sync'].includes(command), `未知命令：${command}`);
  const output = await mutate(root, async state => {
    switch (command) {
      case 'start': return start(state, options, now, resumeTask(progress));
      case 'ask': return ask(state, input, now);
      case 'hint': return hint(state, input);
      case 'answer': return answer(state, input as Answer, now);
      case 'skip': return end(state, true);
      case 'finish': return end(state, false);
      case 'register':
        check(Array.isArray(input.topics), 'register 需要 topics 数组');
        for (const topic of input.topics as Omit<Topic, 'card'>[]) await verifySource(root, topic.source);
        register(state, input.topics, now);
        return { registered: state.topics.length, gradedReviews: state.events.length };
      case 'sync': return { topics: state.topics.length, gradedReviews: state.events.length };
    }
  });
  console.log(JSON.stringify(output, null, 2));
}
main().catch(error => { console.error(JSON.stringify({ error: error.message })); process.exitCode = 1; });
