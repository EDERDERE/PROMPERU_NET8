import { store } from "../state.js";
import { registerEvent } from "../utils/eventHandler.js";
import { updateSaveTest } from "../utils/testAction.js";
import { setupFormListeners } from "../utils/updateNextButton.js";
import { validateFormIfNeeded } from "../utils/validateForm.js";

const NavigationButtons = (
  showBack = true,
  showNext = true,
  backText = "Anterior",
  nextText = "Siguiente"
) => {
  const disabledClass = store.getState().isSavingElement ? "d-none" : "";

  const nextContent = store.getState().isSavingElement
    ? `<div class="loading">
        <span class="loader"></span>
      </div>`
    : `<span>${nextText}</span>`;

const nextStep = async () => {
  const state = store.getState();
  if (state.isSavingElement) return;
  if (!validateFormIfNeeded(state)) return;

  const { activeTest } = state.test || {};
  const hasInstructions = activeTest?.instructions;
  const currentStep = state.currentStep;

  const inInstructions = hasInstructions && typeof currentStep !== "number";

  if (!inInstructions) {
    const currentElement = activeTest.elements[currentStep];
    if (currentElement) {
      currentElement.isComplete = true;
    }

    if (currentStep + 1 >= state.test?.activeTest?.elements.length) {
      const test = state.test;
      const activeStep = test.steps.find((step) => step.current);
      if (activeStep) {
        activeStep.isComplete = true;
      }
    }

    await updateSaveTest();
  }

  store.setState({ previusStep: currentStep });

  if (inInstructions) {
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
    if (state.isSavingElement) return;

    const currentStep = state.currentStep;
    if (typeof currentStep === "number" && currentStep > 0) {
      store.setState({ currentStep: currentStep - 1 });
    }
  };

  registerEvent("click", "nextStep", nextStep);
  registerEvent("click", "prevStep", prevStep);

  setupFormListeners();

  return `
    <div class="d-flex justify-content-end">
      <div class="d-flex gap-3 buttons_group">
        ${
          showBack
            ? `
              <div class="text-decoration-none ${disabledClass}" data-event="prevStep">
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
              <div class="text-decoration-none " data-event="nextStep">
                <div class="button-test d-flex align-items-center">
                  ${nextContent}
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
