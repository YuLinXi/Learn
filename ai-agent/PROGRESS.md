# 学习进度

更新时间：2026-10-16（Asia/Shanghai）

## 当前接续点

- 核心模块通过验收：0 / 14；进阶方向：尚未选择。
- 当前：M01 学习中。基线诊断中，用户正确指出原文库存为 12、输出为 21，并解释“JSON 格式正确，不代表响应正确”。
- 已知基础：用户自述熟悉 TypeScript / Node.js、async/await、HTTP 调用与 JSON 解析；暂无 LLM API 调用经验，详见 [学习记录 0001](learning-records/0001-baseline-and-output-validation.md)。
- 学习方式：用户自主阅读原始资料，教师拆目标、配阅读范围与汇报点，期间按需答疑，汇报后进行诊断。
- 接续：[M01 阶段 A](modules/01-llm-foundations/README.md#阶段-a词元与提示词)：阅读 Hello-Agents 3.2.2 与 3.2.1 指定部分。读完后汇报已读范围、自己的解释、一个提示词示例和疑问；卡住时可提前回来。
- 阶段 A 阅读状态：待用户汇报；理解验证：待诊断。尚无原文阅读完成或 API 实操证据。

## 状态规则

未开始 → 学习中 → 待验收 → 已通过；验收暴露缺口则回到学习中。已通过只表示达到本模块验收标准，长期保持情况单列在复习队列中。选修从“未选择”开始。

## 模块状态

| 模块 | 主题 | 状态 | 最近学习 | 证据 / 记录 |
|---|---|---|---|---|
| M01 | [大语言模型与 LLM 应用基础](modules/01-llm-foundations/README.md) | 学习中 | 2026-10-16 | [基线与理解证据](learning-records/0001-baseline-and-output-validation.md)；阶段 A 阅读待汇报，模块验收待完成 |
| M02 | [Agent 的基本概念与经典范式](modules/02-agent-patterns/README.md) | 未开始 | — | — |
| M03 | [工具调用与 Agent Runtime](modules/03-tools-runtime/README.md) | 未开始 | — | — |
| M04 | [使用 Agents SDK 开发单 Agent](modules/04-agents-sdk/README.md) | 未开始 | — | — |
| M05 | [上下文工程](modules/05-context-engineering/README.md) | 未开始 | — | — |
| M06 | [记忆、会话与持久化状态](modules/06-memory-state/README.md) | 未开始 | — | — |
| M07 | [RAG 与知识检索](modules/07-rag/README.md) | 未开始 | — | — |
| M08 | [工作流、状态机与长任务执行](modules/08-workflows/README.md) | 未开始 | — | — |
| M09 | [MCP、Agent Skills 与能力扩展](modules/09-mcp-skills/README.md) | 未开始 | — | — |
| M10 | [多 Agent 协作](modules/10-multi-agent/README.md) | 未开始 | — | — |
| M11 | [TypeScript Agent 框架的工程组织](modules/11-mastra-engineering/README.md) | 未开始 | — | — |
| M12 | [评测、Tracing 与持续改进](modules/12-evaluation/README.md) | 未开始 | — | — |
| M13 | [安全、可靠性与运行维护](modules/13-safety-reliability/README.md) | 未开始 | — | — |
| M14 | [Agent 与 Web 应用集成](modules/14-web-integration/README.md) | 未开始 | — | — |
| A1 | [Coding Agent 与通用 Agent](modules/a1-coding-agents/README.md) | 未选择 | — | — |
| A2 | [多模态、浏览器与计算机操作](modules/a2-multimodal-computer-use/README.md) | 未选择 | — | — |
| A3 | [模型后训练与 Agentic RL](modules/a3-agentic-rl/README.md) | 未选择 | — | — |

## 复习队列

| 知识点 / 模块 | 依据 | 上次结果 | 下次复习日期 | 状态 |
|---|---|---|---|---|
| JSON 格式与内容正确性的区分 | [库存提取诊断](learning-records/0001-baseline-and-output-validation.md) | 正确识别 12 → 21 的内容错误；复杂场景迁移待验证 | 2026-10-17 | 下次以新例子闭卷回忆 |

已获理解证据的知识点可以先安排复习，不等于模块通过验收。续学时先检查已到期内容；暂按首次验证后的 1、3、7、14 天安排，按回忆表现调整。

## 待解决问题

当前没有已提交但未解决的技术阅读问题。后续按需记录原文位置、疑问与待验证点；得到教师解释后仍须根据用户作答判断理解状态。

本文件保存阅读与诊断状态；learning-records 保存有证据的理解、纠错和已知能力。
