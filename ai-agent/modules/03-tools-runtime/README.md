# M03 · 工具调用与 Agent Runtime

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M02；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- Function Calling / Tool Calling 的完整交互过程。
- 工具名称、描述、参数 Schema、返回值与错误设计。
- 工具注册、参数校验、实际执行、结果回传。
- 串行与并行调用、超时、重试、取消和幂等。
- 最大步数、循环检测及执行过程记录。

主读：[OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)。  
配合：[Hello-Agents 第 7 章：构建你的 Agent 框架](https://github.com/datawhalechina/hello-agents/tree/main/docs/chapter7)。

这一模块的重点是理解：**模型负责提出工具调用，应用负责校验和执行，并决定是否继续运行。**

## 建议短课顺序

1. 工具契约与参数校验
2. 最小工具执行循环
3. 超时、重试、取消与步数预算

以上是教学拆分，每次只生成一个可练习的小单元；按你的反馈继续拆小或跳过已掌握部分。

## 模块验收

用 TypeScript 实现一个最小工具循环；用模拟响应验证正常返回、无效参数和步数耗尽，解释模型与应用的职责。

验收通过须有你的解释、作答或练习证据；教师示范和课件生成不算通过。证据位置与下一步统一写入 [PROGRESS.md](../../PROGRESS.md)。
