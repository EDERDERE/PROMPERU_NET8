import { store } from "../state.js";
import { registerEvent } from "../utils/eventHandler.js";

const NavigationButtons = (
  showBack = true,
  showNext = true,
  backText = "Anterior",
  nextText = "Siguiente"
) => {
  const nextStep = () => {
    const state = store.getState();
    const currentStep = state.currentStep;
    const activeElement = state.test?.activeTest?.elements[currentStep];

    if (activeElement && activeElement.type === "form") {
      const formEl = document.getElementById("userForm");
      if (!formEl.checkValidity()) {
        formEl.classList.add("was-validated");
        return;
      }
    }

    store.setState({ previusStep: currentStep });
    if (typeof currentStep !== "number") {
      store.setState({ currentStep: 0 });
      return;
    }
    if (currentStep + 1 >= state.test?.activeTest?.elements.length) {
      store.setState({ currentStep: "results" });
      return;
    }
    store.setState({ currentStep: currentStep + 1 });
  };

  const prevStep = () => {
    const state = store.getState();
    const currentStep = state.currentStep;
    if (typeof currentStep === "number" && currentStep > 0) {
      store.setState({ currentStep: currentStep - 1 });
    }
  };

  registerEvent("click", "nextStep", nextStep);
  registerEvent("click", "prevStep", prevStep);

  const updateNextButtonState = () => {
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
  };

  setTimeout(() => {
    const formEl = document.getElementById("userForm");
    if (formEl) {
      formEl.addEventListener("input", updateNextButtonState);
      updateNextButtonState();
    }
  }, 0);

  return `
    <div class="d-flex justify-content-end">
      <div class="d-flex gap-3 buttons_group">
        ${
          showBack
            ? `
              <div class="text-decoration-none" data-event="prevStep">
                <div class="button-outline d-flex align-items-center h-100">
                  <span>${backText}</span>
                </div>
              </div>
              `
            : ""
        }
        ${
          showNext
            ? `
              <div class="text-decoration-none" data-event="nextStep">
                <div class="button-test d-flex align-items-center">
                  <span>${nextText}</span>
                </div>
              </div>
              `
            : ""
        }
      </div>
    </div>
  `;
};

export default NavigationButtons;
