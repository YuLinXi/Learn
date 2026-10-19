# M05 · 上下文工程

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M04；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 区分系统指令、用户请求、历史消息、工具结果和外部资料。
- 选择当前任务需要的信息，控制上下文预算。
- 历史裁剪、摘要、压缩与按需检索。
- 上下文污染、冲突、过期信息与长对话退化。
- 将任务状态保存在对话之外。

主读：[Hello-Agents 第 9 章：上下文工程](https://hello-agents.datawhale.cc/#/./chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B)。  
深入：[《深入理解 AI Agent》第 2 章](https://github.com/bojieli/ai-agent-book/blob/main/book/chapter2.md)、[Anthropic：Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)。

## 建议阶段目标

1. 上下文来源与信任边界
2. 裁剪、摘要和检索
3. 外置任务状态与长对话恢复

## 模块验收

对一份过长对话给出上下文保留方案；证明关键约束保留、过期内容移除，能从外部任务状态继续。
