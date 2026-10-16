# AI Agent Resources

整理日期：2026-10-16。以章节阅读入口与用途索引整理；不要求整套读完。各模块的指定章节见 [课程目录](CURRICULUM.md)。可访问性检查见 [链接检查记录](reference/link-checks.md)；访问成功不代表每一章都已逐段审读，授课时须核对具体内容和接口版本。

## Knowledge

- [Hello-Agents · Datawhale](https://github.com/datawhalechina/hello-agents)
  中文原理主教材。按 M01–M03、M05–M07、M09、M12 指定章节阅读；Python 示例用于理解机制，自己的练习优先 TS。第 11 章留给 A3。
- [OpenAI Agents SDK · TypeScript](https://openai.github.io/openai-agents-js/)
  M04、M10 的主要开发资料。阅读 Quickstart → Agents → Running agents → Results；会话、工具与 Trace 按需查。
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
  M01：区分 JSON 语法、Schema 约束和事实正确性。首节短课重点读 Structured Outputs vs JSON mode 与 Handling mistakes。
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

## Wisdom (Communities)

- [Hello-Agents Discussions](https://github.com/datawhalechina/hello-agents/discussions)
  用于具体章节问题与练习讨论；先整理复现过程和自己的理解。
- [《深入理解 AI Agent》Discussions](https://github.com/bojieli/ai-agent-book/discussions)
  用于开放式思考题、架构取舍与真实实践反馈。社区参与自愿，尚未确认用户偏好。

## Gaps

- 目前未确认用户已有技能、可用 API 服务和预算；开始相应练习时补齐。
- 版本随课程进展固定在各练习中；本次不锁定未来课程的 SDK 和模型版本。
- 教材链接已经整理，不代表所有示例已在本机运行。无法直接访问的资料在链接检查记录中标明。
