# M02 · Agent 的基本概念与经典范式

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M01；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- Agent、普通 LLM 调用、确定性工作流的适用场景。
- Agent Loop：观察、决策、行动、接收结果、继续执行。
- ReAct、Plan-and-Solve、Reflection。
- 任务拆分、计划修正、停止条件与执行预算。
- 如何判断一个问题是否需要 Agent。

主读：Hello-Agents [第 1 章：初识智能体](https://hello-agents.datawhale.cc/#/./chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93)、[第 4 章：智能体经典范式构建](https://hello-agents.datawhale.cc/#/./chapter4/%E7%AC%AC%E5%9B%9B%E7%AB%A0%20%E6%99%BA%E8%83%BD%E4%BD%93%E7%BB%8F%E5%85%B8%E8%8C%83%E5%BC%8F%E6%9E%84%E5%BB%BA)。  
补充：[Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)，理解提示链、路由、并行、协调者与执行者等模式。

## 建议阶段目标

1. LLM 调用、工作流与 Agent 的选择
2. ReAct 与观察—行动循环
3. 计划、反思与停止条件

## 模块验收

为三个需求选择普通调用、工作流或 Agent 并说明理由；画出含工具结果和停止条件的运行循环。
