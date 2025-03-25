import { store } from "../state.js";

function updateNextButtonState() {
  const state = store.getState();
  const currentStep = state.currentStep;
  const activeElement = state.test?.activeTest?.elements[currentStep];
  if (activeElement && activeElement.type === "form") {
    const formEl = document.getElementById("userForm");
    const nextButton = document.querySelector("[data-event='nextStep']");
    if (formEl && nextButton) {
      if (!formEl.checkValidity()) {
        nextButton.classList.add("button-disabled");
        nextButton.style.pointerEvents = "none";
      } else {
        nextButton.classList.remove("button-disabled");
        nextButton.style.pointerEvents = "auto";
      }
    }
  }
}

export function setupFormListeners() {
  setTimeout(() => {
    const formEl = document.getElementById("userForm");
    if (formEl) {
      formEl.addEventListener("input", updateNextButtonState);
      updateNextButtonState();
    }
  }, 0);
}
