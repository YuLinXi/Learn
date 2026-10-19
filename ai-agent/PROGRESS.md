# 学习进度

更新时间：2026-10-20（Asia/Shanghai）

## 当前接续点

- 核心模块通过验收：0 / 14；进阶方向：尚未选择。
- 当前：M01 学习中；阶段 A 的阅读与本次诊断已完成；阶段 B 已完成条件概率的基础答疑，等可能骰子情境的正确作答见 [学习记录 0004](learning-records/0004-conditional-probability.md)，继续指定阅读。
- 学习基础：既有编程与 API 经验待确认；已验证能区分字符数与 Token 数、解释 Tokenizer 基本职责，详见 [学习记录 0001](learning-records/0001-tokenizer-and-token-count.md)。准确计数实操及补充边界待验证。
- 学习方式：用户自主阅读原始资料，教师拆目标、配阅读范围与汇报点，期间按需答疑，汇报后进行诊断。
- 下一步：下次学习先复习队列中已到期的四项，再确认语料库的范围边界与增加语料后的统计；随后继续按 [阶段 B：模型如何学习和生成](modules/01-llm-foundations/README.md#阶段-b模型如何学习和生成) 阅读与汇报。
- 阶段 A：已完成指定阅读（用户汇报）并通过本次诊断（2026-10-19）；阶段 B：条件概率在简单等可能情境中已有正确作答，指定阅读完成情况待用户汇报，阶段整体理解待诊断。

## 阶段 B 当前任务

- 目标：描述逐 Token 生成过程；解释 Attention、位置信息、因果掩码的基本作用；区分训练与生成，以及预训练与指令调优。
- 阅读范围：Hello-Agents 3.1.1 抓演进动机，3.1.2 读文字、结构图与注意力直觉，3.1.3 完整阅读；再读 3.2.1 的“（3）指令调优的影响”。国内在线站对应章节已于 2026-10-19 核对，入口见模块文档。
- 阅读深度：建议 30–45 分钟，可分两次；公式推导与 Python / PyTorch 实现选读，以能够解释机制为目标。
- 汇报点：读完指定范围后，描述逐 Token 生成流程；解释 Attention 与位置信息的用途；比较在提示词里加入示例与指令调优；列出疑问。遇到阻碍可提前提问。

## 阶段 A 任务与验收

- 本次结果：Token / Tokenizer 基本概念、简化 BPE 两轮统计与合并、单样本提示词设计已获得作答证据；后续通过新情境复习检查保持与迁移。

- 目标：解释 Token 与 Tokenizer、Token 与字符及单词的关系，说明 BPE 反复合并相邻单元的基本思路；区分零样本、单样本与少样本提示，并写出有明确任务、输入、输出要求的提示词。
- 阅读深度：重点读分词动机、子词思路与 BPE 合并例子；Python 模拟实现、WordPiece / SentencePiece 的进一步比较选读；3.2.2.3 只需了解开发影响。提示工程只读上述两个指定部分，采样公式和其余内容留待后续。
- 纸面练习：为活动通知设计提示词，以 JSON 对象输出 name、date、location 三个字段；日期保留原文，不补年份，缺失信息用 null。补充一条不同于待处理文本的完整输入/输出示例。待处理文本为“10月24日，在B会议室举行TypeScript分享会。”；说明提示类型与示例用途，本阶段不要求调用 API。
- 汇报内容：已读范围；自己的 Token / Tokenizer 解释及 Token 与字符的关系；BPE 合并思路；提示词全文及示例的用途；不确定之处。能尝试解释并交出提示词即可回来，随后用迁移题诊断。

## 状态规则

未开始 → 学习中 → 待验收 → 已通过；验收暴露缺口则回到学习中。已通过只表示达到本模块验收标准，长期保持情况单列在复习队列中。选修从“未选择”开始。

## 模块状态

| 模块 | 主题 | 状态 | 最近学习 | 证据 / 记录 |
|---|---|---|---|---|
| M01 | [大语言模型与 LLM 应用基础](modules/01-llm-foundations/README.md) | 学习中 | 2026-10-19 | 阶段 A 本次诊断通过：[Token / Tokenizer](learning-records/0001-tokenizer-and-token-count.md)、[BPE](learning-records/0002-bpe-frequency-and-merge-application.md)、[提示词设计](learning-records/0003-one-shot-information-extraction.md)；阶段 B 阅读待汇报 |
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
| Token / Tokenizer 与字符数的区分 | [学习记录 0001](learning-records/0001-tokenizer-and-token-count.md) | 基本概念诊断通过；模型共用分词器等补充边界待迁移验证 | 2026-10-20 | 待复习：闭卷回忆与迁移检查 |
| BPE 频次统计与合并应用 | [学习记录 0002](learning-records/0002-bpe-frequency-and-merge-application.md) | 两轮统计与合并作答正确，第一轮含教师示范；已能继续迭代 | 2026-10-20 | 待复习：用新语料闭卷检查统计与合并 |
| 单样本提示与信息提取规则 | [学习记录 0003](learning-records/0003-one-shot-information-extraction.md) | 提示词设计与单样本判断正确；尚未运行模型 | 2026-10-20 | 待复习：用缺失字段与改变示例数量的情境检查迁移 |
| 条件概率的基本含义 | [学习记录 0004](learning-records/0004-conditional-probability.md) | 正确限定结果为 5、6，并算出 1/2 | 2026-10-20 | 待复习：用新条件检查理解，再联系语言模型表达式 |

已获理解证据的知识点可以先安排复习，不等于模块通过验收。续学时先检查已到期内容；暂按首次验证后的 1、3、7、14 天安排，按回忆表现调整。

## 待解决问题

- 语料库：对应 Hello-Agents 3.1.1 的迷你语料库与频次统计例子。教师已用两句示例说明材料集合与条件概率计数；用户进一步提出“用来训练大模型的海量数据、文献等”，已联系到训练材料这一常见用途。教师补充语料库也可很小、来源不局限于文献，并可用于研究或评估；这些范围边界与增加样本后的统计迁移仍待用户作答验证。
- 条件概率的基础疑问已获得正确迁移作答；语言模型中的条件概率估计与链式法则在后续阅读汇报中继续检查。

本文件保存阅读与诊断状态；learning-records 保存有证据的理解、纠错和已知能力。
