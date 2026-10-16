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

主读：[Hello-Agents](https://github.com/datawhalechina/hello-agents)第 1、4 章。  
补充：[Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)，理解提示链、路由、并行、协调者与执行者等模式。

## 建议短课顺序

1. LLM 调用、工作流与 Agent 的选择
2. ReAct 与观察—行动循环
3. 计划、反思与停止条件

以上是教学拆分，每次只生成一个可练习的小单元；按你的反馈继续拆小或跳过已掌握部分。

## 模块验收

为三个需求选择普通调用、工作流或 Agent 并说明理由；画出含工具结果和停止条件的运行循环。

验收通过须有你的解释、作答或练习证据；教师示范和课件生成不算通过。证据位置与下一步统一写入 [PROGRESS.md](../../PROGRESS.md)。
