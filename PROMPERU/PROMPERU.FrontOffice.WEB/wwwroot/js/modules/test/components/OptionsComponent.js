export function OptionsComponent({ answers, selectAnswers }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return answers
    .map((item, index) => {
      const selected =
        selectAnswers && selectAnswers.find((answer) => answer.id == item.id)
          ? "selected"
          : "";
      return `
        <div class="question-box mb-3 ${selected}" data-event="quizOption" data-option=${item.id}>
          <span class="option-label">${alphabet[index]}</span> ${item.text}
        </div>
      `;
    })
    .join("");
}
