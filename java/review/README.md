# Java 学习前自适应复习

复用 `ai-agent/review` 已有的 `ts-fsrs@5.4.2` / FSRS-6 代码与依赖，**Java 课程和状态独立**。本目录的 npm 命令把引擎根目录固定到 `java/`，因此来源校验、进度读写与状态写入都针对 Java。没有复制 AI 课程知识点、历史评分或未答题。

引擎原本把 `--root` 描述为测试隔离参数，本空间通过固定启动命令复用其目录隔离能力；日常使用下面的 Java 命令，不直接使用引擎默认根目录。当前模块采用 M01–M09，知识点 ID 以 `java-` 开头。

## 环境与命令

需要 Node.js 22+ 和同一 Learn 检出中的 `ai-agent/review`。已有依赖可直接使用；换设备缺依赖时，在 Learn 根目录执行 `npm --prefix ai-agent/review ci`。不需要在本目录安装第二套算法依赖。

从 Learn 根目录运行：

```sh
npm --prefix java/review run review -- plan
npm --prefix java/review run review -- start
```

在 `java/` 内把 `--prefix java/review` 换成 `--prefix review`。所有 JSON 请求文件放在本目录 `request-<会话唯一ID>.json`，`--input` 传该文件名或绝对路径。npm 在本目录执行脚本，因此相对请求文件名相对 `java/review/`，不会写入 AI 空间。

例如从 Learn 根目录执行 `npm --prefix java/review run review -- ask --input request-<会话唯一ID>.json`；实际使用时替换占位名。真实学习不传 `--root` 或 `--now`，始终采用固定 Java 根目录和真实当前时间。

## 续学接入流程

1. **恢复**：读取 Java 的 PROGRESS.md、当前模块与相关学习记录。只给已登记且直接相关的前置知识点 ID；没有就使用空数组。课程断点保留在 PROGRESS.md。
2. **开始**：执行 `start`；需要预算/前置关系时先写请求：

   ```json
   { "module": "M01", "availableMinutes": 20, "prerequisiteIds": [] }
   ```

   时间未知省略该字段，不先追问。用户提供明确下次学习时间时可加带时区的 `nextSessionAt`，模糊时间省略。`continue` 接回原任务；`resume-review` 原样恢复 `pending.prompt` 和已有提示；`review` 从 `selected` 选一道。初始空队列应直接续学。
3. **出题前存档**：写 `{ "topicId": "实际ID", "prompt": "完整题目、语料和条件", "rubric": "正确依据和边界" }`，执行 `ask --input ...`，保存返回的 `result.id` 作为 `attemptId`，再展示题目。一次一道，题目限于已学范围。
4. **提示先记录**：若要提示或揭示答案，先用 `hint` 保存 `{ "attemptId": "实际ID", "text": "提示全文", "answerBeforeHint": "已有原回答" }`；没有原回答省略该字段。
5. **作答评分**：真实回答后写请求并执行 `answer`：

   ```json
   {
     "attemptId": "实际ID",
     "answer": "用户实际回答",
     "correct": true,
     "assisted": false,
     "effort": "normal",
     "feedback": "判断依据与尚未验证的范围"
   }
   ```

   未答、跳过、教师解释均不调用 `answer`。依赖提示按 Again；独立正确而明确费力为 Hard；独立正确通常 Good；有明确熟练证据才 Easy。不从聊天等待时长判断回忆难度。真实耗时未知时省略 `durationMinutes`。
6. **验证与返回**：返回 `saved: true`、`summarySynced: true` 后，读回本目录 state.json 的事件和 Java PROGRESS.md 的复习段。再执行只读 `plan`，预算足够才继续，否则 `finish` 并恢复最新课程断点。
7. **暂停与跳过**：结束整次学习时保留未答复习题，并按 Java AGENTS.md 保存课程断点；用户明确跳过时执行 `start` 后 `skip`。不要为了收尾虚构作答或清除未答题。重复“继续”遵循引擎已有同日预算和跳过规则。

## 登记知识点

先保存真实学习记录，然后执行 `register --input ...`。请求结构：

```json
{
  "topics": [{
    "id": "java-m01-reference-equality",
    "title": "对象身份与内容比较",
    "module": "M01",
    "source": "learning-records/实际存在的记录.md",
    "lastEvidenceDate": "实际作答日期 YYYY-MM-DD",
    "priorSummary": "真实结果及未验证边界",
    "minutes": 2
  }]
}
```

示例中的文件名、日期和结果是占位符，不可直接提交。`source` 必须指向 `java/` 内实际存在的 Markdown。用户背景自述、AI 笔记和未学内容不登记；重复 ID 不重置模型。登记仅添加已有证据，不补造历史评分。

## 状态与故障处理

- `review/state.json` 是 Java 算法状态与事件来源；`PROGRESS.md` 的“复习队列”由工具同步，模块成绩由教学证据单独更新。
- 默认目标保持率 90%，关闭随机扰动与分钟级短期调度；默认开场预算 5 分钟，有时间预算时按引擎限制选择。模型回忆概率是估计，不是实测掌握分数。
- 历史证据没有评分的条目先待校准，首次真实复习才建立模型。完整调度行为与数据契约沿用[共享引擎说明](../../ai-agent/review/README.md#候选选择与状态)；其中路径/课程名一律以本文件的 Java 启动入口为准。
- JSON 已保存而摘要失败时执行 Java 命令 `sync`。锁冲突先检查是否有并发写入；损坏状态保留并报告，不能重置历史。
- 本次空间建设只初始化空状态并做隔离验证，真实课程保持 0 个知识点、0 次评分、无学习会话。首次实际续学才执行真实 `start`。

`plan` 为只读检查；脚本/文档维护不会开始学习或生成成绩。引擎升级后应复核两个空间的路径隔离，再用于真实学习。
