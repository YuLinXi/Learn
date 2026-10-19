# M11 · TypeScript Agent 框架的工程组织

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M10；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 将 Agent、工具、工作流、记忆和存储组织成应用。
- 模型接入、配置管理和依赖边界。
- 框架如何处理流式输出、状态与可观测性。
- 哪些机制交给框架，哪些仍需要业务代码控制。
- 阅读框架抽象，并能对应到底层运行机制。

主读：[Mastra 官方文档](https://mastra.ai/docs)。  
建议顺序：**Agents → Tools → Memory → Workflows → Storage → Traces → Evals → Server / Deployment**。

这一模块用于串起前面学过的机制；不用再从头重复学习一遍 Agent 概念。

## 建议阶段目标

1. Agent、工具与配置组织
2. 记忆、存储与工作流组合
3. 观测、评测及部署边界

## 模块验收

把已有小练习组织到 Mastra 中，标出各组件职责，并指出仍需业务代码处理的约束。
