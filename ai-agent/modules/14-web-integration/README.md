# M14 · Agent 与 Web 应用集成

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M13；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 浏览器、服务端与 Agent Runtime 的职责划分。
- 流式消息、工具执行事件和进度展示。
- 多轮会话、历史恢复与会话持久化。
- 取消执行、重试、异常状态和连接恢复。
- 人工确认、结构化结果与交互组件。
- Next.js / React 中的身份认证和服务端权限校验。

主读：[Vercel AI SDK 文档](https://ai-sdk.dev/docs/introduction)，重点学习 **AI SDK Core、AI SDK UI、Streaming 和 Tool Calling**。  
配合：[OpenAI Agents SDK：Running agents](https://openai.github.io/openai-agents-js/guides/running-agents)，理解 Agent 执行事件如何接入前端。

## 建议阶段目标

1. 浏览器、服务端与 Runtime
2. 流式事件、会话和交互
3. 取消、重连和人工确认

## 模块验收

接入一个最小 Web 界面，演示流式显示、取消、历史恢复和人工确认，并说明服务端权限校验位置。
