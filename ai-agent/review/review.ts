import { createHash, randomUUID } from 'node:crypto';
import { createEmptyCard, fsrs, Rating, type Card, type ReviewLog } from 'ts-fsrs';

type StoredCard = Omit<Card, 'due' | 'last_review'> & { due: string; last_review?: string };
type StoredLog = Omit<ReviewLog, 'due' | 'review'> & { due: string; review: string };
export interface Topic {
  id: string;
  title: string;
  module: string;
  source: string;
  lastEvidenceDate: string;
  priorSummary: string;
  minutes: number;
  legacyDue?: string;
  card: StoredCard | null;
}
interface Hint { text: string; answerBeforeHint?: string }
interface Question {
  id: string;
  topicId: string;
  prompt: string;
  rubric: string;
  askedAt: string;
  hints: Hint[];
}
interface Session {
  id: string;
  startedAt: string;
  module: string;
  budgetMinutes: number;
  spentMinutes: number;
  prerequisiteIds: string[];
  nextSessionAt?: string;
  status: 'active' | 'finished' | 'skipped';
  reviewedIds: string[];
  resumeTask: string;
  pending: Question | null;
}
export interface Answer {
  attemptId: string;
  answer: string;
  correct: boolean;
  assisted: boolean;
  effort?: 'hard' | 'normal' | 'easy';
  feedback: string;
  durationMinutes?: number;
}
interface Event extends Question {
  reviewedAt: string;
  answer: string;
  correct: boolean;
  assisted: boolean;
  feedback: string;
  grade: 'Again' | 'Hard' | 'Good' | 'Easy';
  durationMinutes: number;
  durationEstimated: boolean;
  requestHash: string;
  log: StoredLog;
}
export interface ReviewState {
  version: 1;
  retention: number;
  topics: Topic[];
  events: Event[];
  session: Session | null;
}
export interface Options {
  module: string;
  availableMinutes?: number;
  prerequisiteIds?: string[];
  nextSessionAt?: string;
  force?: boolean;
}

export function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
export function text(value: unknown, name: string): asserts value is string {
  check(typeof value === 'string' && value.trim().length > 0, `${name} 必须是非空字符串`);
}
export function timestamp(value: string): Date {
  check(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.test(value), '时间须为带时区的 ISO 时间');
  const date = new Date(value);
  check(Number.isFinite(date.getTime()) && dateOnly(value.slice(0, 10)) &&
    Number(value.slice(11, 13)) < 24, '无效时间');
  return date;
}
export function localDay(date: Date): string {
  return new Date(date.getTime() + 8 * 3_600_000).toISOString().slice(0, 10);
}
function dateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function scheduler(state: ReviewState) {
  return fsrs({ request_retention: state.retention, enable_fuzz: false, enable_short_term: false });
}
export function emptyState(): ReviewState {
  return { version: 1, retention: 0.9, topics: [], events: [], session: null };
}
export function register(state: ReviewState, topics: Omit<Topic, 'card'>[], now: Date) {
  check(Array.isArray(topics) && topics.length > 0, 'topics 须包含至少一个知识点');
  for (const topic of topics) {
    text(topic.id, 'id');
    check(/^[a-z0-9-]+$/.test(topic.id), 'id 仅使用小写字母、数字和连字符');
    text(topic.title, 'title');
    check(/^M\d{2}$|^A\d+$/.test(topic.module), 'module 须为 M01 或 A1 等模块编号');
    text(topic.source, 'source');
    text(topic.priorSummary, 'priorSummary');
    check(dateOnly(topic.lastEvidenceDate) && topic.lastEvidenceDate <= localDay(now), '证据日期须真实有效且不晚于今天');
    check(Number.isFinite(topic.minutes) && topic.minutes > 0, 'minutes 须大于零');
    check(!topic.legacyDue || dateOnly(topic.legacyDue), '旧计划日期无效');
    const previous = state.topics.find(t => t.id === topic.id);
    if (previous) {
      check(previous.title === topic.title && previous.source === topic.source, '知识点 ID 已被其他内容使用');
      continue;
    }
    state.topics.push({ ...topic, card: null });
  }
}
function currentSession(state: ReviewState, now: Date) {
  const session = state.session;
  return session && (session.pending || localDay(timestamp(session.startedAt)) === localDay(now)) ? session : null;
}
function validateOptions(state: ReviewState, options: Options, now: Date) {
  check(/^M\d{2}$|^A\d+$/.test(options.module), '请提供当前 module');
  if (options.availableMinutes !== undefined) {
    check(Number.isFinite(options.availableMinutes) && options.availableMinutes > 0, 'availableMinutes 须大于零');
  }
  check(options.prerequisiteIds === undefined || Array.isArray(options.prerequisiteIds), 'prerequisiteIds 须为数组');
  for (const id of options.prerequisiteIds ?? []) check(state.topics.some(t => t.id === id), `未知前置知识点：${id}`);
  if (options.nextSessionAt) check(timestamp(options.nextSessionAt) > now, '下次计划时间须晚于现在');
}

export function plan(state: ReviewState, options: Options, now: Date) {
  validateOptions(state, options, now);
  const session = currentSession(state, now);
  if (session?.pending) {
    return { decision: 'resume-review', sessionId: session.id, pending: session.pending, resumeTask: session.resumeTask };
  }
  if (session && session.status !== 'active' && !options.force) {
    return { decision: 'continue', reason: '本轮开场复习已结束；继续原学习任务', resumeTask: session.resumeTask };
  }
  const config = session?.status === 'active' ? {
    module: options.module,
    prerequisiteIds: options.prerequisiteIds ?? (session.module === options.module ? session.prerequisiteIds : []),
    nextSessionAt: options.nextSessionAt ?? session.nextSessionAt,
  } : options;
  const requestedBudget = Math.min(5, (options.availableMinutes ?? 20) / 4);
  const budget = session?.status === 'active' ? Math.min(session.budgetMinutes, requestedBudget) : requestedBudget;
  const spent = session?.status === 'active' ? session.spentMinutes : 0;
  const remaining = Math.max(0, budget - spent);
  const engine = scheduler(state);
  const candidates = state.topics.flatMap(topic => {
    if (session?.status === 'active' && session.reviewedIds.includes(topic.id)) return [];
    const prerequisite = config.prerequisiteIds?.includes(topic.id) ?? false;
    const recall = topic.card ? engine.get_retrievability(topic.card, now, false) : null;
    const nextRecall = topic.card && config.nextSessionAt && timestamp(config.nextSessionAt) > now
      ? engine.get_retrievability(topic.card, timestamp(config.nextSessionAt), false) : null;
    let kind: 'due' | 'calibration' | 'before-gap';
    let reason: string;
    if (!topic.card) {
      if (topic.lastEvidenceDate >= localDay(now)) return [];
      kind = 'calibration';
      reason = '已有历史证据，缺少实际复习评分；先做一次闭卷校准';
    } else if (timestamp(topic.card.due) <= now) {
      kind = 'due';
      reason = 'FSRS 安排已到期';
    } else if (prerequisite && nextRecall !== null && nextRecall < state.retention &&
      topic.card.last_review && localDay(timestamp(topic.card.last_review)) < localDay(now)) {
      kind = 'before-gap';
      reason = '当前前置知识在下次计划学习时预计低于目标；可提前检查';
    } else return [];
    return [{ ...topic, kind, reason, prerequisite, currentModule: topic.module === config.module, recall, nextRecall }];
  });
  const rank = { due: 2, calibration: 1, 'before-gap': 0 };
  candidates.sort((a, b) => Number(b.prerequisite) - Number(a.prerequisite) ||
    Number(b.currentModule) - Number(a.currentModule) || rank[b.kind] - rank[a.kind] ||
    (a.recall !== null && b.recall !== null ? a.recall - b.recall : 0) ||
    a.lastEvidenceDate.localeCompare(b.lastEvidenceDate) || a.id.localeCompare(b.id));
  let allowance = remaining;
  const selected = candidates.filter(topic => {
    if (topic.minutes > allowance) return false;
    allowance -= topic.minutes;
    return true;
  });
  return {
    decision: selected.length ? 'review' : 'continue',
    reason: selected.length ? '在预算内逐题复习，完成后恢复原任务' : '暂无适合本次预算的复习项，直接继续学习',
    sessionId: session?.id, budgetMinutes: budget, spentMinutes: spent,
    selected, remainingCount: candidates.length - selected.length,
    resumeTask: session?.resumeTask,
  };
}
export function start(state: ReviewState, options: Options, now: Date, resumeTask: string) {
  validateOptions(state, options, now);
  const existing = currentSession(state, now);
  if (existing?.pending) {
    if (localDay(timestamp(existing.startedAt)) !== localDay(now)) {
      existing.startedAt = now.toISOString();
      existing.spentMinutes = 0;
      existing.reviewedIds = [];
    }
    if (options.availableMinutes !== undefined) existing.budgetMinutes = Math.min(5, options.availableMinutes / 4);
    return plan(state, options, now);
  }
  if (existing && !options.force) {
    if (existing.status === 'active') {
      if (existing.module !== options.module) existing.prerequisiteIds = [];
      existing.module = options.module;
      if (options.prerequisiteIds) existing.prerequisiteIds = options.prerequisiteIds;
      if (options.nextSessionAt) existing.nextSessionAt = options.nextSessionAt;
      if (options.availableMinutes !== undefined) existing.budgetMinutes = Math.min(5, options.availableMinutes / 4);
    }
    return plan(state, options, now);
  }
  state.session = {
    id: randomUUID(), startedAt: now.toISOString(), module: options.module,
    budgetMinutes: Math.min(5, (options.availableMinutes ?? 20) / 4), spentMinutes: 0,
    prerequisiteIds: options.prerequisiteIds ?? [], nextSessionAt: options.nextSessionAt,
    status: 'active', reviewedIds: [], resumeTask, pending: null,
  };
  return plan(state, options, now);
}
export function ask(state: ReviewState, input: { topicId: string; prompt: string; rubric: string }, now: Date) {
  text(input.prompt, 'prompt');
  text(input.rubric, 'rubric');
  const session = state.session;
  check(session?.status === 'active', '请先 start 开始学习');
  if (session.pending) {
    check(session.pending.topicId === input.topicId && session.pending.prompt === input.prompt &&
      session.pending.rubric === input.rubric, '已有未答复习题，请恢复原题或 skip');
    return session.pending;
  }
  const candidate = plan(state, { module: session.module }, now);
  check(candidate.selected?.some(t => t.id === input.topicId), '该知识点未进入本次预算内的候选列表');
  session.pending = { id: randomUUID(), topicId: input.topicId, prompt: input.prompt,
    rubric: input.rubric, askedAt: now.toISOString(), hints: [] };
  return session.pending;
}
export function hint(state: ReviewState, input: { attemptId: string; text: string; answerBeforeHint?: string }) {
  const pending = state.session?.pending;
  check(pending && pending.id === input.attemptId, '找不到对应未答题');
  text(input.text, '提示内容');
  if (!pending.hints.some(h => h.text === input.text)) pending.hints.push({ text: input.text, answerBeforeHint: input.answerBeforeHint });
  return pending;
}
export function answer(state: ReviewState, input: Answer, now: Date) {
  text(input.attemptId, 'attemptId');
  text(input.answer, 'answer');
  text(input.feedback, 'feedback');
  check(typeof input.correct === 'boolean' && typeof input.assisted === 'boolean', '须明确 correct 与 assisted');
  check(input.effort === undefined || ['hard', 'normal', 'easy'].includes(input.effort), 'effort 无效');
  check(input.durationMinutes === undefined || (Number.isFinite(input.durationMinutes) && input.durationMinutes > 0), 'durationMinutes 须大于零');
  const requestHash = createHash('sha256').update(JSON.stringify({
    attemptId: input.attemptId, answer: input.answer, correct: input.correct,
    assisted: input.assisted, effort: input.effort ?? 'normal', feedback: input.feedback,
    durationMinutes: input.durationMinutes ?? null,
  })).digest('hex');
  const previous = state.events.find(event => event.id === input.attemptId);
  if (previous) {
    check(previous.requestHash === requestHash, '该作答已保存，重复请求的内容不一致');
    return { alreadyRecorded: true, event: previous };
  }
  const session = state.session;
  const question = session?.pending;
  check(session?.status === 'active' && question?.id === input.attemptId, '找不到对应未答题');
  check(now >= timestamp(question.askedAt), '作答时间不能早于出题时间');
  const topic = state.topics.find(t => t.id === question.topicId)!;
  check(!topic.card?.last_review || now >= timestamp(topic.card.last_review), '作答时间不能早于上次复习');
  const assisted = input.assisted || question.hints.length > 0;
  const grade = !input.correct || assisted ? Rating.Again :
    input.effort === 'hard' ? Rating.Hard : input.effort === 'easy' ? Rating.Easy : Rating.Good;
  const result = scheduler(state).next(topic.card ?? createEmptyCard(now), now, grade);
  topic.card = { ...result.card, due: result.card.due.toISOString(), last_review: result.card.last_review?.toISOString() };
  topic.lastEvidenceDate = localDay(now);
  const duration = input.durationMinutes ?? topic.minutes;
  const event: Event = {
    ...question, reviewedAt: now.toISOString(), answer: input.answer, correct: input.correct,
    assisted, feedback: input.feedback, grade: Rating[grade] as Event['grade'],
    durationMinutes: duration, durationEstimated: input.durationMinutes === undefined, requestHash,
    log: { ...result.log, due: result.log.due.toISOString(), review: result.log.review.toISOString() },
  };
  state.events.push(event);
  session.spentMinutes += duration;
  session.reviewedIds.push(topic.id);
  session.pending = null;
  return { alreadyRecorded: false, event, due: topic.card.due, resumeTask: session.resumeTask };
}
export function end(state: ReviewState, skip: boolean) {
  check(state.session, '尚无学习回合');
  check(skip || !state.session.pending, '仍有未答题，请保留原题或明确 skip');
  state.session.status = skip ? 'skipped' : 'finished';
  state.session.pending = null;
  return { decision: 'continue', resumeTask: state.session.resumeTask, status: state.session.status };
}
