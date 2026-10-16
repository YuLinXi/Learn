document.querySelectorAll("form[data-quiz]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let answered = 0;
    let correct = 0;
    const questions = [...form.querySelectorAll("fieldset")];
    questions.forEach((question) => {
      const choice = question.querySelector("input:checked");
      const feedback = question.querySelector(".feedback");
      if (!choice) {
        feedback.textContent = "请先选择一个答案。";
        return;
      }
      answered += 1;
      const ok = choice.value === question.dataset.answer;
      if (ok) correct += 1;
      feedback.textContent = (ok ? "回答正确。 " : "再想一想。 ") + question.dataset.explanation;
    });
    form.querySelector("[data-summary]").textContent =
      answered === questions.length
        ? "本次自测：" + correct + " / " + questions.length + "。请把答案和你的理由发回聊天，由教师记录进度。"
        : "还有题目未作答；页面不会自动写入学习记录。";
  });
});
