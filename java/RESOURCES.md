# 资料索引与版本差异

核对：2026-10-23。一个中文主教材、官方小练习与文档、公司源码各有用途；每次只取当前能力点的一份主材料和必要参考。完成标准在模块中，不以读完整章为标准。

## R01 · 中文概念主线

[廖雪峰 Java 教程目录](https://liaoxuefeng.com/books/java/introduction/index.html) / [GitHub 原始教材](https://github.com/michaelliao/liaoxuefeng.com/tree/main/source/books/java)。免费公开教材，许可 [CC BY-NC-SA 4.0](https://liaoxuefeng.com/pages/license/index.html)；本空间保存来源链接与必要总结，不镜像教材。

| 模块 | 精确选读范围，按诊断缩减 |
|---|---|
| M01 | 2.2.2；2.3；3.1.1–3.1.10；3.2.1、3.2.4、3.2.9。流程控制仅补不熟的部分 |
| M02 | 4.1–4.5；6.1；7.1–7.4（extends/super 遇到签名再补）；第 8 章 List、equals、Map、Set 与遍历；9 章文件读取；10.3/10.5 在日期任务中使用；19 章 Lambda、方法引用、Stream |
| M03 | [第 15 章 Maven](https://liaoxuefeng.com/books/java/maven/index.html) 的介绍、依赖、构建、插件、多模块 |
| M04 | 22.1、22.2、22.4.1–22.4.4；23.1、23.5、23.7；5.1、5.3、5.6 与第 6 章按当前注解补；17.4 Jackson 按 JSON 契约读 |
| M05 | [第 18 章 JDBC](https://liaoxuefeng.com/books/java/jdbc/index.html)；22.3.1–22.3.3、22.3.6 |
| M07 | 11.1–11.3、11.5；4.10 日志按故障读 |
| M08 | 14.4、14.6、14.6.8–14.6.10、14.7–14.9、14.11；按线程池/中断/共享状态任务选择 |
| M06 / M09 | 公司源码为主；按遇到的机制回查上述小节，不新增完整课程 |

教程当前以 Java 22 为背景；本课程代码限制在 Java 17 语言/API 基线。章节号按本次目录核对，网站变更时按标题重新定位。现代语法、虚拟线程和完整设计模式目录不作为前置。

## R02 · Spring 官方开源练习

- M04：[REST Service](https://github.com/spring-guides/gs-rest-service)。先实现本课程契约，再对照 complete/ 的组织方式。
- M05：[Managing Transactions](https://github.com/spring-guides/gs-managing-transactions)。理解整组写入如何提交/回滚；其示例数据库不能代替本课程 MySQL 行为验证。
- M07：[Testing the Web Layer](https://github.com/spring-guides/gs-testing-web)。区别上下文启动、MockMvc 与真实 HTTP/数据库验证。

示例 main 会变化；当前 [REST POM](https://github.com/spring-guides/gs-rest-service/blob/main/complete/pom.xml) 是 Boot 4.0.8，不能直接覆盖本地 Boot 3.5 POM。课程起始工程固定版本，业务代码留给学习者实现。以 REST 仓库为例，代码 [Apache-2.0](https://github.com/spring-guides/gs-rest-service/blob/main/LICENSE.txt)，文字 [CC BY-ND 3.0](https://github.com/spring-guides/gs-rest-service/blob/main/LICENSE.writing.txt)。

## R03 · Maven

[Dependency Mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) / [Five Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html) / [官网源码](https://github.com/apache/maven-site)。重点查 scope、传递依赖、dependencyManagement、聚合与继承，再映射公司 POM。有效 POM/依赖树仅在依赖可解析时验证，不通过盲目升级绕过内部依赖缺失。

## R04 · SQL 与 MyBatis

- [MySQL 8.4 教程](https://dev.mysql.com/doc/refman/8.4/en/tutorial.html)：建表、查询、NULL、排序、聚合、多表；按需查 [JOIN](https://dev.mysql.com/doc/refman/8.4/en/join.html)、[事务](https://dev.mysql.com/doc/refman/8.4/en/commit.html)。8.4 是练习版本，不是公司版本结论。
- [MyBatis 中文 XML 映射](https://mybatis.org/mybatis-3/zh_CN/sqlmap-xml.html)：参数、select、更新、resultMap；[动态 SQL](https://mybatis.org/mybatis-3/zh_CN/dynamic-sql.html)。[源码](https://github.com/mybatis/mybatis-3) 用于按需查证。
- [MyBatis Starter 兼容表](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)：3.0 系列支持 Boot 3.2–3.5、Java 17+。M05 引入 3.0.5，实际解析版本须记录；M04 空工程不提前引入数据库依赖。

## R05 · 测试与框架机制

- [JUnit 5.10.3 用户指南](https://docs.junit.org/5.10.3/user-guide/)：2.3 测试方法、2.5 断言、生命周期、异常与参数化测试。M01 先用最小断言，M07 再系统学习。
- [Mockito](https://github.com/mockito/mockito)：从 README 的官方 API 入口查 stub、verify、异常；优先构造注入，说明 mock 替代了哪些边界。
- [Spring 事务注解](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html) 与 [代理机制](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)：只查当前调用问题；文档主版本与公司版本分别核实。

## R06 · 补缺

[JavaGuide](https://github.com/Snailclimb/JavaGuide) 的 Java 基础、集合、并发用于薄弱点查阅；[dev.java](https://dev.java/learn/) 用于语言语义核实。补充资料不形成第二条通读或刷题主线。

## 练习与公司版本差异卡

| 项目 | 独立练习 | 公司可见事实 / 未知项 |
|---|---|---|
| Java | Java 17 语言/API；实际运行 JDK 见 [准备记录](practice/PREPARATION.md) | 精确编译与运行版本待父依赖及环境核实 |
| Spring Boot | Web 起始 POM 固定 3.5.16；[支持范围](https://docs.spring.io/spring-boot/3.5/system-requirements.html) | `com.seeyon:boot:6.0.0-TEST-SNAPSHOT` 是公司父工程版本 |
| 参数校验 | `jakarta.validation`，验证 DTO 需正确接入校验机制 | 字典源码使用 `javax.validation`；仅凭包名不能推断公司 Boot 版本 |
| 注入/权限 | 标准 Spring 注解；权限在练习服务中按明确规则实现 | `@BootApp`、`@AppService`、权限过滤器等需逐层查证 |
| 请求响应 | 本课程明确的普通 JSON/HTTP 契约 | `SingleRequest/Response`、`@MultiRequestBody` 等是公司封装 |
| JSON | 大整数 ID 作为字符串；缺省/null 规则见字典契约 | 公司序列化规则须源码或接口证据，不能套用练习规则 |

只有模块进入、来源失效或版本冲突时才重新核对对应资料。资料核查与教师准备不计学习成绩。
