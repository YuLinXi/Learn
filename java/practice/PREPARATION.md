# 课程准备验证

日期：2026-10-23。执行者：助手；性质：教学材料与环境检查，不是用户学习证据。

## 已完成的检查

| 检查 | 实际结果 |
|---|---|
| 基础 Java 骨架 | Maven test 成功：1 个启动测试，0 失败、0 错误 |
| Spring Web 骨架 | Maven test 成功：1 个真实本地 HTTP 测试，随机端口启动，未配置路径返回预期 404 |
| Java 目标版本 | 两个骨架的应用 class major version 均为 61（Java 17 目标） |
| 销售夹具 | 12 行数据；A/PAID 为 9 笔、数量 17、金额 169.50；地区/商品、分页、标签筛选、空结果与预期一致，使用十进制精确计算核对 |
| 模块与链接 | 9 个模块编号、顺序、验收段一致；本地 Markdown 与源码链接存在性检查通过 |
| 复习只读入口 | Java review plan 返回 saved=false、decision=continue，正确恢复原诊断题；空队列未注册知识或评分 |
| 保留范围 | 与准备前摘要对比，已有 AI Agent 文件、Java 背景记录及复习 state.json 内容未变 |
| 课程一致性 | 当前课程文件已清除旧模块编号和已取消的阶段；历史背景原文保留 |

骨架命令详见 README.md。测试结果文件由 Maven 写在各骨架 target/surefire-reports/，属于忽略的构建产物。数据核查使用 Python Decimal 对固定期望逐项断言，没有保存业务实现作为学习答案。

## 实际环境与限制

- Maven 3.9.16；显式使用已有 Homebrew OpenJDK 21.0.11。命令级 JAVA_HOME，不改全局 Java、Maven 或 shell 配置。
- 基础 POM：JUnit 5.10.3、Compiler 3.14.1、Surefire 3.5.4；Web POM：Spring Boot 3.5.16 管理依赖。
- 编译目标是 Java 17，实际运行是 JDK 21；JDK 17 运行尚未实测，不能把 class 版本视为完整运行验证。
- Web 骨架只有启动类，没有字典或销售接口。测试时 Mockito/Byte Buddy 输出动态附加提示，本次测试成功；这不是业务行为证据。
- MySQL 未安装/启动，MyBatis 的数据库行为待 M05 验证。公司工程只读，未构建、启动或执行测试。
- 两个测试都是教学准备检查；用户模块保持 0/9，真实作答、独立代码和公司运行尚未验证。
