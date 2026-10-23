# M05 · SQL、JDBC、MyBatis 与事务

前置：M04。目标是把接口落实到可靠的数据读写，并能解释 SQL 和失败后的状态。

## 定向阅读

[R04](../../RESOURCES.md)：SQL 查询、NULL、JOIN、分组、约束、事务；MyBatis 参数、结果映射、动态 SQL。[R01](../../RESOURCES.md) 第 18 章及 22.3.1–22.3.3/22.3.6；事务 Guide 与 Spring 代理文档按需。

公司对照：[CategoryDao](/Users/yu/Desktop/work/seeyon-backends/udc/udc-biz/src/main/java/com/seeyon/udc/entity/domain/dao/UdcEnumCategoryDao.java:11) 与 [JdbcQueryDatabaseExecutor](/Users/yu/Desktop/work/seeyon-backends/cdp-report/cdp-report-query/src/main/java/com/seeyon/cdp/report/query/execution/jdbc/JdbcQueryDatabaseExecutor.java:60)。MyBatis 与直接 JDBC 都属于必需阅读范围。

## 小任务顺序

1. 在本地 MySQL 8.4 学习库建立字典分类/子项表，定义主键、唯一约束和关联；只用合成数据。记录实际数据库版本。
2. 先写 SQL 重现 [销售 S1–S3](../../practice/SALES.md) 的业务口径，再通过一段最小 JDBC 参数化查询读取结果；解释 Connection/Statement/ResultSet 生命周期。
3. 为字典接入 MyBatis，自己编写必要 SQL 与 resultMap，解释绑定参数与拼接 SQL 的区别。业务键约束通过真实数据库验证。
4. 将分类和子项写入放在一个事务；故意让后续子项违反约束，检查分类与之前子项均未留下。解释代理调用边界和异常传播，避免只靠注解名称判断事务生效。
5. 选一条列表查询查看 EXPLAIN，说明过滤、排序和索引的关系；不把优化所有查询作为门槛。
6. 阅读公司 JDBC 的借连接、保存状态、只读事务、提交/回滚、恢复并归还。能解释原因即可，不要求复刻连接池或租约系统。

独立 JDBC 实验与 Spring 托管事务分别说明资源所有者：前者由本人管理连接生命周期，后者先确认事务管理器的职责，不把手工提交/关闭机械搬进框架托管调用。

## 本轮验收

- [ ] 用实际 MySQL 数据证明查询、唯一约束及回滚，不能仅由 mock 推断。
- [ ] Java 与 SQL 在明确口径下符合期望，解释 JOIN 重复和稳定分页。
- [ ] 能说明参数绑定、结果映射和 JDBC 资源释放，区分 0 行与异常。
- [ ] 解释事务生效需要的调用路径，并验证一个失败场景。
- [ ] 能定位公司连接状态恢复与底层 DAO 边界；公司环境仍可待验。

## 接续

进入 M06。数据库不可用时可继续 SQL 推演与源码阅读，但数据库行为项保持待验证，不由静态分析替代。
