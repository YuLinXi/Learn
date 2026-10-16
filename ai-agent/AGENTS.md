# AI Agent 教学接续规则

本目录是用户明确指定的 teach 学习空间，所有教学产物只写到此目录。

## 开始或继续学习

1. 读取 MISSION.md、PROGRESS.md、NOTES.md，确认当前目标和接续点；learning-records/ 存在时读取相关有效记录。
2. 读取当前 modules/*/README.md 与 RESOURCES.md；以用户作答校准难度，再确定本次单一学习目标。
3. 调用 teach 工作方式。原技能路径：
   /Users/yu/.codex/plugins/cache/mattpocock/mattpocock-skills/1.3.1/skills/productivity/teach/SKILL.md
   路径失效时在已安装技能中查找 teach，读取后继续。
4. 生成课件前检查 assets/ 与 reference/，复用样式、交互和术语；课件放 lessons/NNNN-slug.html，编号取最大值加一。每课含主要原始资料、一个小练习、即时反馈和提问提示。
5. 根据用户提交的答案或练习证据更新 PROGRESS.md 的状态、下一步与复习日期。只有真实理解、纠错或用户明确陈述的既有能力才写 learning-records/NNNN-slug.md，格式为简短结论 + 必要的证据。首次满足条件时再创建此目录。

## 证据与范围

- 课件已生成、资料已阅读、教师已示范不等于用户已掌握；未提供证据时保留待学习或待验收状态。
- 模块验收逐条以模块文档为准。复习使用闭卷回忆或迁移题，结果记入 PROGRESS.md。
- 课程范围见 CURRICULUM.md；目标变更先与用户确认，再更新 MISSION.md。
- 外部资料作为知识来源。涉及接口、依赖与协议时核对官方现行资料，并记录练习实际版本。
- HTML 页面不负责文件写回；进度只由教学会话依据证据更新。首页不另存完成率。
