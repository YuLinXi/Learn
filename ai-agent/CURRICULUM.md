# 课程目录

路线按知识依赖排列，保留原聊天的 14 个核心模块与 3 个进阶方向。每个模块目录已有学习范围、对应资料、阶段目标线索与验收标准；从原始资料阅读进入，按阶段汇报和诊断。

## 核心模块

| 模块 | 主题 | 阶段目标线索 |
|---|---|---|
| M01 | [大语言模型与 LLM 应用基础](modules/01-llm-foundations/README.md) | 词元与提示词 → 模型如何学习和生成 → 上下文与调用预算 → 结构化输出与能力边界 |
| M02 | [Agent 的基本概念与经典范式](modules/02-agent-patterns/README.md) | LLM 调用、工作流与 Agent 的选择 → ReAct 与观察—行动循环 → 计划、反思与停止条件 |
| M03 | [工具调用与 Agent Runtime](modules/03-tools-runtime/README.md) | 工具契约与参数校验 → 最小工具执行循环 → 超时、重试、取消与步数预算 |
| M04 | [使用 Agents SDK 开发单 Agent](modules/04-agents-sdk/README.md) | 定义 Agent 与执行一次 Run → 工具、会话与流式事件 → Guardrails 与基础 Trace |
| M05 | [上下文工程](modules/05-context-engineering/README.md) | 上下文来源与信任边界 → 裁剪、摘要和检索 → 外置任务状态与长对话恢复 |
| M06 | [记忆、会话与持久化状态](modules/06-memory-state/README.md) | 历史、任务状态、用户记忆与知识库 → 写入、检索、更新和遗忘 → 跨会话恢复与用户隔离 |
| M07 | [RAG 与知识检索](modules/07-rag/README.md) | 解析、分块与元数据 → 检索、重排序和证据组装 → Agentic RAG 与检索评测 |
| M08 | [工作流、状态机与长任务执行](modules/08-workflows/README.md) | 节点、状态与控制流 → 暂停、检查点和人工介入 → 恢复、重试与幂等 |
| M09 | [MCP、Agent Skills 与能力扩展](modules/09-mcp-skills/README.md) | MCP 架构与能力类型 → Client、Server 与连接 → Skill 结构和能力边界 |
| M10 | [多 Agent 协作](modules/10-multi-agent/README.md) | 单 Agent 与协作的取舍 → Handoff 与 Agent as Tool → 隔离、汇总与终止 |
| M11 | [TypeScript Agent 框架的工程组织](modules/11-mastra-engineering/README.md) | Agent、工具与配置组织 → 记忆、存储与工作流组合 → 观测、评测及部署边界 |
| M12 | [评测、Tracing 与持续改进](modules/12-evaluation/README.md) | 任务集、指标和判分规则 → Trace、Span 与失败归因 → 对照实验和回归 |
| M13 | [安全、可靠性与运行维护](modules/13-safety-reliability/README.md) | 提示注入与最小权限 → 隔离、审计和审批 → 限流、预算、恢复与运维 |
| M14 | [Agent 与 Web 应用集成](modules/14-web-integration/README.md) | 浏览器、服务端与 Runtime → 流式事件、会话和交互 → 取消、重连和人工确认 |

## 进阶选修

- [A1 · Coding Agent 与通用 Agent](modules/a1-coding-agents/README.md)
- [A2 · 多模态、浏览器与计算机操作](modules/a2-multimodal-computer-use/README.md)
- [A3 · 模型后训练与 Agentic RL](modules/a3-agentic-rl/README.md)

## 推进方式

教师先把模块拆成小目标，指定原始资料的精确阅读范围、必读与选读、阅读深度和阶段汇报点。用户自主阅读，期间随时提问；教师按需解读，并筛选值得记录的疑问与理解变化。

读完指定范围或遇到阻碍时回来汇报已读内容、自己的理解、练习证据和疑问；教师据此诊断、安排补读或复习，再给出下一阶段。阅读状态和理解验证分别记录。每模块通过自身验收后再推进；已有基础可以用诊断证据跳过重复内容。

[M01](modules/01-llm-foundations/README.md) 已给出具体阅读阶段。后续模块现有三项是目标线索，开始相应模块前再核对原文并细化任务，不要求一次性读完整套资料。

M04、M07、M10、M14 完成后安排一次混合复习：把相关概念放到同一个小场景中比较和应用。M03 起就保留执行记录，到 M12 再系统学习评测。

默认复习间隔为首次验收后的 1、3、7、14 天，作为可调整的教学安排；实际日期写入 [PROGRESS.md](PROGRESS.md)。表现不稳定时缩短间隔，稳定后延长。无需为了赶日期推进新课。

资料顺序：主读建立概念 → 官方文档确认当前接口 → 按需查进阶教材。具体 API、依赖版本与示例在开课时重新核对。

来源：[原路线聊天](thread://01a14020-ce41-7eb1-ba1b-550a1d7a42c3?hostId=local)。
