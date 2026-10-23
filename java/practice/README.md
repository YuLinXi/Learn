# 练习入口

这里只维护两组业务材料：[应用字典](DICTIONARY.md) 和 [销售统计](SALES.md)。Java 基础与 Web 两个起始骨架按阶段使用，后续任务继续扩展本人代码；骨架不是已完成的业务练习。

## 文件与使用方式

| 位置 | 用途 |
|---|---|
| [starters/java-basics/pom.xml](starters/java-basics/pom.xml) | M01：Java 程序入口与一个 JUnit 启动检查 |
| [starters/spring-web/pom.xml](starters/spring-web/pom.xml) | M04：可启动的 Spring Web、校验和测试依赖；没有业务接口 |
| [data/sales.csv](data/sales.csv) | 12 行合成销售数据，M02 起使用 |
| [data/sales-expected.json](data/sales-expected.json) | 可独立核算的业务期望，不含 Java/SQL 解法 |
| [data/sale-tags.csv](data/sale-tags.csv) | M05 联表基数练习，首次做数据处理时不引入 |
| [PREPARATION.md](PREPARATION.md) | 助手准备验证、实际版本与限制，不是学习成绩 |

开始练习时将需要的骨架复制到 `practice/work/` 的本人目录，只复制 POM 和 src，保留起始材料；本人的代码与报告可持续增补。M03 的验收要求独立重建基础工程，不能将复制动作记作会配置 Maven。

## 版本

语言和 API 基线是 Java 17；基础骨架通过 `maven.compiler.release=17` 固定。Web 骨架由 Boot 父 POM 和 `java.version=17` 管理，具体版本见 POM。M05 再加入 MyBatis Starter 3.0.5 和 MySQL 8.4，数据库没有在本次准备中安装或启动。

本机已有 Homebrew JDK 21.0.11，Maven 默认选中 JDK 26.0.1。以下命令只对当前调用显式选择 JDK 21，不改 shell 或全局工具链；JDK 21 在 [Boot 3.5 支持范围](https://docs.spring.io/spring-boot/3.5/system-requirements.html) 内。它验证 Java 17 目标代码在 JDK 21 的行为，不是 JDK 17 实际运行证据。已配置 JDK 17 的机器可将 JAVA_HOME 改为对应路径后使用相同 POM，并记录实际版本。

## 在本机运行（Learn 根目录）

M01 只使用基础骨架：

```sh
JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home mvn -f java/practice/starters/java-basics/pom.xml test
/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home/bin/java -cp java/practice/starters/java-basics/target/classes learning.LearningMain
```

到 M04 再验证 Web 骨架：

```sh
JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home mvn -f java/practice/starters/spring-web/pom.xml test
JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home mvn -f java/practice/starters/spring-web/pom.xml spring-boot:run
```

Web 手工运行绑定 `127.0.0.1:8080`，Ctrl+C 结束；测试使用随机端口。骨架没有业务路由，404 是启动检查的预期，不代表字典接口已经实现。首次运行需解析公开 Maven 依赖；网络/依赖故障单列为工程问题。

## 产物与验收

本人任务记录可从 [练习模板](../templates/exercise-report.md) 取用，写在本人代码旁。至少记录当前目标、帮助程度、执行命令、期望与实际、未验证范围。

教师起始工程与准备测试仅说明工具可用。本人代码、公司源码理解、公司运行三个维度按 [课程规则](../CURRICULUM.md) 分别验收。后续教学只为当前任务提供必要骨架，不预填业务答案。
