export function validateFormIfNeeded(state) {
  const currentStep = state.currentStep;
  const activeElement = state.test?.activeTest?.elements[currentStep];
  let isValid = true;

  if (activeElement && activeElement.type === "form") {
    const formEl = document.getElementById("userForm");
    if (formEl && !formEl.checkValidity()) {
      formEl.classList.add("was-validated");
      isValid = false;
    }
  }

  if (
    activeElement &&
    (activeElement.answerType === "multipleChoice" ||
      activeElement.answerType === "singleChoice" ||
      activeElement.answerType === "text")
  ) {
    if (
      !activeElement.selectAnswers ||
      activeElement.selectAnswers.length === 0
    ) {
      isValid = false;
    }
  }

  const nextButton = document.querySelector('[data-event="nextStep"]');
  if (nextButton) {
    if (!isValid) {
      nextButton.classList.add("button-disabled");
    } else {
      nextButton.classList.remove("button-disabled");
    }
  }

  return isValid;
}
