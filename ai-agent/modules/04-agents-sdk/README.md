# M04 · 使用 Agents SDK 开发单 Agent

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M03；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- Agent 定义：指令、模型、工具、输出类型。
- Run 的生命周期、执行结果和流式事件。
- 运行上下文、会话状态与多轮对话。
- 工具调用接入、基础 Guardrails。
- 基础 Tracing，以及如何定位一次执行失败。

主读：[OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents/sdk)。  
建议阅读顺序：[Quickstart](https://openai.github.io/openai-agents-js/guides/quickstart) → [Define agents](https://openai.github.io/openai-agents-js/guides/agents) → [Running agents](https://openai.github.io/openai-agents-js/guides/running-agents) → [Results](https://openai.github.io/openai-agents-js/guides/results)。

## 建议阶段目标

1. 定义 Agent 与执行一次 Run
2. 工具、会话与流式事件
3. Guardrails 与基础 Trace

## 模块验收

完成一个带工具的单 Agent 小练习，说明上下文与会话的区别，并从 Trace 定位一次失败。
