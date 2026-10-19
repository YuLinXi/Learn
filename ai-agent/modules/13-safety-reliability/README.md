# M13 · 安全、可靠性与运行维护

[课程总览](../../CURRICULUM.md) · [进度](../../PROGRESS.md) · [资料索引](../../RESOURCES.md)

## 前置

默认完成 M12；已有基础可先通过本模块诊断再调整节奏。

## 内容与对应资料

学习内容：
- 提示注入、外部内容可信度与工具权限边界。
- 最小权限、敏感操作审批、沙箱与密钥管理。
- 用户数据隔离、日志脱敏和审计。
- 并发、限流、队列、预算和资源配额。
- 网络失败、服务超时、状态恢复与降级。
- 部署配置、版本升级及运行监控。

主读：[Microsoft 第 18 课：Securing AI Agents](https://github.com/microsoft/ai-agents-for-beginners/tree/main/18-securing-ai-agents)、[第 10 课：AI Agents in Production](https://github.com/microsoft/ai-agents-for-beginners/tree/main/10-ai-agents-production)。  
配合：[OpenAI Guardrails and Approvals](https://openai.github.io/openai-agents-js/guides/guardrails)、Mastra 的部署相关文档。

## 建议阶段目标

1. 提示注入与最小权限
2. 隔离、审计和审批
3. 限流、预算、恢复与运维

## 模块验收

为同一小练习写出威胁与故障清单；验证外部文本不能获得额外权限、失败可恢复且敏感日志经过脱敏。
