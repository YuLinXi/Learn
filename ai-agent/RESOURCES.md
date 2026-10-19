# 原始学习资料

按阶段直接阅读原始资料；本文件保存资料入口与用途，具体小目标、精确阅读范围和汇报点见 [课程目录](CURRICULUM.md) 中的当前模块。分配阅读任务时核对相关内容与接口版本。

## 教材与官方文档

- [Hello-Agents · Datawhale 国内在线阅读](https://hello-agents.datawhale.cc/#/)
  中文原理主教材。按 M01–M03、M05–M07、M09、M12 指定章节阅读；Python 示例用于理解机制，自己的练习优先 TS。第 11 章留给 A3。
- [OpenAI Agents SDK · TypeScript](https://openai.github.io/openai-agents-js/)
  M04、M10 的主要开发资料。阅读 Quickstart → Agents → Running agents → Results；会话、工具与 Trace 按需查。
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
  M01 阶段 D：区分 JSON 语法、Schema 约束和事实正确性，阅读 Structured Outputs vs JSON mode、Handling mistakes、Streaming 及边界处理。
- [OpenAI Conversation state](https://developers.openai.com/api/docs/guides/conversation-state#managing-the-context-window)
  M01 阶段 C：阅读 Managing the context window 及其文本生成说明，区分上下文窗口、输入与输出用量。
- [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)
  M03：工具声明、模型请求、应用执行与结果回传。
- [Mastra 官方文档](https://mastra.ai/docs)
  M08、M11、M12：按 Agents → Tools → Memory → Workflows → Storage → Traces → Evals → Server / Deployment 阅读；重点理解组件的工程组织。
- [《深入理解 AI Agent》· 李博杰](https://github.com/bojieli/ai-agent-book)
  架构进阶主参考。第 2、3、7、10 章配合核心模块；第 5、6、8、9 章配合选修方向。
- [Microsoft AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners)
  专题补充：第 5 课 RAG、第 8 课多 Agent、第 10 课生产、第 18 课安全、第 15 课浏览器；用于补充例子。
- [Building effective agents · Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
  M02：比较常见工作流与 Agent 模式，练习判断何时需要更复杂的控制方式。
- [Effective context engineering · Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
  M05：上下文选择、压缩和长任务状态组织。
- [LangGraph JavaScript 概览](https://docs.langchain.com/oss/javascript/langgraph/overview)
  M08 选读：对照持久执行、状态与人工介入机制，不重复学习整个框架。
- [MCP 官方架构](https://modelcontextprotocol.io/docs/learn/architecture)
  M09：Host、Client、Server 和协议能力。稳定入口会随现行版本重定向，开课时记录具体版本。
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
  M09：只读工具的 Client / Server 练习，采用当时官方安装和连接方式。
- [Agent Skills 官方文档](https://agentskills.io/home)
  M09：目录、SKILL.md 和渐进式加载，厘清 Skill 与工具协议的关系。
- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction)
  M14：AI SDK Core / UI、流式输出与工具交互，关注浏览器和服务端职责。
- [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction)
  遇到核心概念不清楚时用作另一种讲解；不是额外必修课程。

## 使用约定

- 原文入口用于查找资料，当前模块中的指定范围才是本阶段阅读任务。
- 具体 API、依赖和协议版本在相应练习开始前核对，并在练习中记录。
- 访问或理解原文遇到阻碍时，带上链接、所在小节与疑问回来讨论。
