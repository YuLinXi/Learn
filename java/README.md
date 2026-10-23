# Java 与公司项目学习空间

面向已有 React / TypeScript / Node.js 经验，**能读懂部分 Java、尚未独立开发后端接口**的学习者。2026-10-23 已确认 9 模块方案及三位评审交叉复核后的修订。

目标是独立开发并验证 Java 接口，追踪 UDC 与 CDP Report 的主要链路，对小需求作出有源码依据的修改判断。按知识依赖推进，不设固定周数，以两组小练习贯穿课程。

## 从这里进入

| 入口 | 用途 |
|---|---|
| [当前进度](PROGRESS.md) | 真实学习结果、待答原题和下一步 |
| [定稿路线](CURRICULUM.md) | 9 模块、前置关系、通过范围 |
| [资料索引](RESOURCES.md) | 中文主线、官方参考及版本差异 |
| [练习入口](practice/README.md) | 最小起始工程、应用字典与销售统计 |
| [公司源码地图](PROJECT-STACK.md) | 7 个 test 快照、入口、架构与证据边界 |
| [源码缺口](SOURCE-REQUESTS.md) | 已取得、无权限、尚未克隆的依赖 |
| [学习规则](AGENTS.md) | 诊断、提示、存档、续学与笔记 |
| [复习机制](review/README.md) | Java 专用的独立状态与共享复习引擎 |

## 9 个模块

| 模块 | 能力目标 |
|---|---|
| [M01 Java 基础与运行](modules/01-java-basics/README.md) | 写类、接口和小程序，解释类型与对象行为 |
| [M02 集合、泛型与数据处理](modules/02-java-data/README.md) | 实现可核算的数据处理并处理边界 |
| [M03 Maven 与公司工程导航](modules/03-maven-projects/README.md) | 独立重建工程，解释依赖、模块和启动位置 |
| [M04 Spring Web 与框架机制](modules/04-spring-web/README.md) | 独立完成内存接口，理解请求、注入和装配 |
| [M05 SQL、JDBC、MyBatis 与事务](modules/05-persistence/README.md) | 实现持久化，证明查询正确性与回滚 |
| [M06 公司业务分层与权限](modules/06-company-business/README.md) | 跟通 UDC 创建和 CDP 前台运行路径 |
| [M07 测试、调试与问题定位](modules/07-testing-debugging/README.md) | 从现象定位既有代码，最小修复并回归 |
| [M08 并发、缓存与服务协作](modules/08-concurrency-integration/README.md) | 验证并发、超时、隔离与资源释放 |
| [M09 公司核心架构](modules/09-company-architecture/README.md) | 解释设计生成发布、查询执行及修改影响 |

测试从 M01 开始，M07 集中补强。M03 可与 M02 交叉，M09 的源码阅读按前置能力分段进入。详细深度以模块文件为准，不把教材目录变成通读清单。

## 如何学习

在 Learn 根目录说 **“开始 Java 学习”** 或 **“继续 Java 学习”**。先恢复待答任务和必要复习，再推进一个小目标；说“今天先到这里”时保存精确断点。

一个能力点按“短诊断 → 定向阅读 → 个人解释/实现 → 反馈 → 新情境复验”推进，可以跨多次会话。学习记录、提示程度和复习由助手维护；你提供自己的解释、代码和实际结果。章节笔记随实际阅读生成，不自动计入掌握。

当前 **0 / 9 模块通过**，尚无课程作答或实践成绩。背景记录保留原始转岗动机，本空间当前课程范围以定稿路线为准。

## 环境与源码边界

独立练习采用 Java 17 语言/API 基线、Spring Boot 3.5 系列、MyBatis Starter 3.0 系列，数据库练习采用 MySQL 8.4。起始工程的具体依赖以其 POM 为准；运行命令与本机验证事实见 [练习入口](practice/README.md)。

公司资料以 [源码地图](PROJECT-STACK.md) 中记录的本地 `test` 提交为依据。公司精确 JDK、Spring 及基础框架版本仍需父依赖与环境证据；源码阅读、独立练习、公司运行分别验收。
