# M01 · 大语言模型与 LLM 应用基础

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

能读懂基础 JSON。用户已自述熟悉 TypeScript / Node.js、async/await 与 HTTP 调用，暂无 LLM API 调用经验；相关理解以诊断与练习继续验证。

## 内容与对应资料

学习内容：
- Token、上下文窗口、输入输出与推理成本。
- Transformer、Attention、预训练与后训练的基本概念。
- 消息结构、指令、示例和提示词设计。
- 结构化输出、JSON Schema、流式响应。
- 幻觉、知识时效性、非确定性及模型能力边界。

主读：[Hello-Agents 第 3 章：大语言模型基础][ha]。补充：[OpenAI Conversation state][context] 与 [Structured Outputs][structured] 的指定小节。

2026-10-16 已核对中文章节的小节位置和补充文档的相关内容。阅读以理解机制为目标；Python 示例读懂意图即可，PyTorch 实现和公式推导可先略读。实际 API 接入前再核对服务、参数支持与依赖版本。

## 阶段 A：词元与提示词

建议 20–30 分钟，可分多次完成。这是当前要执行的阅读任务。

- **小目标 A1**：用自己的话解释 Token、Tokenizer，以及 Token 与字、单词的关系。
- **必读**：[3.2.2 文本分词][ha-token]。重点读分词动机、子词思路与 BPE 合并例子；Python 模拟实现可选读，不要求运行。
- **小目标 A2**：为一个信息提取任务写出明确的任务、输入和输出要求，并解释示例有什么作用。
- **必读**：[3.2.1 提示工程][ha-prompt]中的“（2）零样本、单样本与少样本提示”和“（4）基础提示技巧”。采样公式和其他部分留到后续阶段按需读。
- **回来汇报的条件**：完成上述两段阅读，并尝试给出自己的解释和一个提示词；遇到阻碍理解的概念可以提前提问。
- **汇报内容**：读到哪里；Token 与字符是否一一对应、为什么；你的提示词示例；尚未理解的地方。教师据此给出新的迁移题，不以复述课文判定掌握。

## 阶段 B：模型如何学习和生成

建议 30–45 分钟，可拆成两次阅读。

- **小目标 B1**：解释从有限历史到注意力机制的动机，并能说出 Attention、位置信息与 Decoder-Only 的基本作用。
- **必读**：[3.1 语言模型与 Transformer 架构][ha-model]。3.1.1 先抓演进动机；3.1.2 读文字、结构图和注意力的直觉，代码与推导选读；3.1.3 完整阅读。
- **小目标 B2**：区分训练与生成，以及预训练和指令调优的基本目的。
- **必读**：结合 3.1.3 的训练与生成说明，阅读 3.2.1 中“（3）指令调优的影响”。采样参数部分先理解其作用，不背推荐数值；具体支持以所用模型官方文档为准。
- **回来汇报的条件**：能尝试画出或叙述逐步生成的过程，并说明训练、指令和当前输入各自影响什么；卡点可提前提出。教师会用新例子诊断，不要求实现 Transformer。

## 阶段 C：上下文与调用预算

建议 20–30 分钟。

- **小目标 C1**：区分上下文窗口与输出上限，并为历史消息、当前输入和输出预留空间。
- **必读**：[Conversation state → Managing the context window][context]，包括其下的 Managing context for text generation；前面的会话 API 代码当前可略过。
- **小目标 C2**：根据给定计费用量与单位价格计算调用费用，解释调用次数增加的影响。
- **练习范围**：阶段汇报后由教师提供一份用量和教学费率，检查计算和单位换算；教学费率不代表真实服务报价。进入实际调用时再确定服务与官方计费规则。
- **回来汇报的条件**：读完指定小节，尝试列出一次多轮请求占用上下文的信息；教师随后用预算题检查理解。

## 阶段 D：结构化输出与能力边界

建议 30–40 分钟，可分多次完成。

- **小目标 D1**：区分 JSON 语法、Schema 约束、事实依据与业务执行条件；能处理“证据不足”这一情况。
- **必读**：[3.3.2 模型幻觉][ha-hallucination]；[Structured Outputs][structured] 中 Structured Outputs vs JSON mode、Handling mistakes。
- **小目标 D2**：解释流式响应的用途，以及为什么要关注拒绝和未完成响应。
- **必读**：Structured Outputs 中 Streaming、Refusals with Structured Outputs 及示例中的边界处理；当前只理解流程，代码按需阅读。
- **回来汇报的条件**：读完指定内容，提交一份简单输入/输出契约和反例，并列出尚未理解的响应边界。教师结合已有库存题答案，用新场景进行迁移诊断。

## 汇报与记录

每个阶段结束回来一次即可，学习期间随时可以带原文位置提问。可按“已读范围 / 我的解释或练习 / 不确定的地方”汇报，形式不限。

教师根据你的实际进度诊断、补充阅读或调整下一阶段。原文读完与理解验证分别记录在 [PROGRESS.md](../../PROGRESS.md)；有巩固价值的提问、误区与理解变化按项目规则保存。

## 模块验收

给出一份输入/输出契约和反例，解释格式合法但事实错误的情况；按给定用量算出调用成本。

验收通过须有你的解释、作答或练习证据；读过原文和教师解释不算通过。证据位置与下一步统一写入 [PROGRESS.md](../../PROGRESS.md)。

[ha]: https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter3/%E7%AC%AC%E4%B8%89%E7%AB%A0%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E5%9F%BA%E7%A1%80.md
[ha-token]: https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter3/%E7%AC%AC%E4%B8%89%E7%AB%A0%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E5%9F%BA%E7%A1%80.md#322-文本分词
[ha-prompt]: https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter3/%E7%AC%AC%E4%B8%89%E7%AB%A0%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E5%9F%BA%E7%A1%80.md#321-提示工程
[ha-model]: https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter3/%E7%AC%AC%E4%B8%89%E7%AB%A0%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E5%9F%BA%E7%A1%80.md#31-语言模型与-transformer-架构
[ha-hallucination]: https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter3/%E7%AC%AC%E4%B8%89%E7%AB%A0%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E5%9F%BA%E7%A1%80.md#332-模型幻觉
[context]: https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window
[structured]: https://developers.openai.com/api/docs/guides/structured-outputs
