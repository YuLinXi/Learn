# M12 · 评测、Tracing 与持续改进

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M11；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 建立有代表性的任务集和评判标准。
- 分别评估最终答案、工具选择、执行路径与检索效果。
- 确定性校验、模型评分和人工评价的适用范围。
- Trace、Span、日志及失败类型分析。
- 比较提示词、模型、工具和流程修改前后的效果。
- 统计成功率、延迟、Token 与成本，开展回归评测。

主读：[Hello-Agents 第 12 章：智能体性能评估](https://github.com/datawhalechina/hello-agents/tree/main/docs/chapter12)。  
深入：[《深入理解 AI Agent》第 7 章：Agent 的评估](https://github.com/bojieli/ai-agent-book/blob/main/book/chapter7.md)。  
实现参考：[OpenAI Agent Evals](https://developers.openai.com/api/docs/guides/agent-evals)、[Mastra Evals](https://mastra.ai/docs/evals/overview)。

基础执行记录应从第 3、4 模块就开始接触，到这里再系统学习评估方法。

## 建议短课顺序

1. 任务集、指标和判分规则
2. Trace、Span 与失败归因
3. 对照实验和回归

以上是教学拆分，每次只生成一个可练习的小单元；按你的反馈继续拆小或跳过已掌握部分。

## 模块验收

为小任务集定义评分标准，比较一次变更前后的结果、延迟和用量；人工复核至少一个模型评分。

验收通过须有你的解释、作答或练习证据；教师示范和课件生成不算通过。证据位置与下一步统一写入 [PROGRESS.md](../../PROGRESS.md)。
