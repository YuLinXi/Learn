# M08 · 工作流、状态机与长任务执行

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M07；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 提示链、路由、分支、并行、循环与子工作流。
- 节点、状态、状态转换和执行结果。
- 区分由代码控制的步骤和由模型决定的步骤。
- Checkpoint、暂停、恢复、人工介入。
- 失败重试、幂等和外部操作的恢复策略。

主读：[Mastra Workflows](https://mastra.ai/docs/workflows/overview)。  
深入：[LangGraph JavaScript 概览](https://docs.langchain.com/oss/javascript/langgraph/overview)，重点看状态、持久执行和人工介入的设计。

此处可以比较框架机制，无须同时掌握两套框架的全部 API。

## 建议阶段目标

1. 节点、状态与控制流
2. 暂停、检查点和人工介入
3. 恢复、重试与幂等

## 模块验收

画出并实现一个可暂停恢复的小工作流；重放失败步骤时，外部操作不会重复执行。
