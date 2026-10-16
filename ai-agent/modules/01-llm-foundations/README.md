# M01 · 大语言模型与 LLM 应用基础

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

能读懂基础 JSON；TypeScript / Node.js 熟悉程度在开课时确认。

## 内容与对应资料

学习内容：
- Token、上下文窗口、输入输出与推理成本。
- Transformer、Attention、预训练与后训练的基本概念。
- 消息结构、指令、示例和提示词设计。
- 结构化输出、JSON Schema、流式响应。
- 幻觉、知识时效性、非确定性及模型能力边界。

主读：[Hello-Agents 第 3 章：大语言模型基础](https://github.com/datawhalechina/hello-agents/tree/main/docs/chapter3)。  
补充：[OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)，重点理解结构约束与业务正确性的区别。

## 建议短课顺序

1. Token、上下文与调用预算
2. 模型与提示词基础
3. 结构化输出、流式响应与能力边界

以上是教学拆分，每次只生成一个可练习的小单元；按你的反馈继续拆小或跳过已掌握部分。

已备好可选入门短课：[0001 · 结构正确与事实正确](../../lessons/0001-structure-and-truth.html)。这是模块中的一个小知识点，不代表模块已完成。

## 模块验收

给出一份输入/输出契约和反例，解释格式合法但事实错误的情况；按给定用量算出调用成本。

验收通过须有你的解释、作答或练习证据；教师示范和课件生成不算通过。证据位置与下一步统一写入 [PROGRESS.md](../../PROGRESS.md)。
