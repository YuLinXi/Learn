# M09 · MCP、Agent Skills 与能力扩展

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M08；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- MCP 的 Host、Client、Server 关系。
- Tools、Resources、Prompts 的作用。
- 本地与远程连接、传输方式、认证和版本兼容。
- MCP Client 与 MCP Server 的职责。
- Agent Skills 的目录、`SKILL.md`、触发条件与渐进式加载。
- 工具、MCP、Skill 和工作流之间的关系。

主读：[MCP 官方架构文档](https://modelcontextprotocol.io/docs/learn/architecture)、[Agent Skills 官方文档](https://agentskills.io/home)。  
代码参考：[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)。  
中文补充：[Hello-Agents 第 10 章：智能体通信协议](https://hello-agents.datawhale.cc/#/./chapter10/%E7%AC%AC%E5%8D%81%E7%AB%A0%20%E6%99%BA%E8%83%BD%E4%BD%93%E9%80%9A%E4%BF%A1%E5%8D%8F%E8%AE%AE)。

MCP 的接口和协议细节以官方现行文档为准；A2A 等协议可以在本模块之后选读。

## 建议阶段目标

1. MCP 架构与能力类型
2. Client、Server 与连接
3. Skill 结构和能力边界

## 模块验收

解释 Host、Client、Server 的关系；完成一个只读 MCP 工具练习和一个小 Skill，并说明它们与工作流的区别。
