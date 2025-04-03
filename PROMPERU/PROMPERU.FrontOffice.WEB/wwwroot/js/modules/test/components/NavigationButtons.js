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
  const state = store.getState();
  const isValid = validateFormIfNeeded(state);
  const nextButtonDisabledClass = !isValid ? "button-disabled" : "";
  const disabledClass = store.getState().isSavingElement ? "d-none" : "";

  const saveContent = store.getState().isSavingElement
    ? `<div class="loading">
        <span class="loader"></span>
      </div>`
    : `<span>Guardar Progreso</span>`;

  const nextStep = async () => {
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
    }

    if (inInstructions) {
      store.setState({ currentStep: 0 });
      return;
    }

    store.setState({ currentStep: currentStep + 1, dataIsUpdated: true });
  };

  const prevStep = () => {
    if (state.isSavingElement) return;

    const currentStep = state.currentStep;
    if (currentStep > 0) {
      store.setState({ currentStep: currentStep - 1 });
    } else if (currentStep === 0 && state.test?.activeTest?.hasInstructions) {
      store.setState({ currentStep: "intro" });
    }
  };

  const saveProgress = async () => {
    if (state.isSavingElement) return;

    await updateSaveTest();
    store.setState({ dataIsUpdated: false });
  };

  registerEvent("click", "nextStep", nextStep);
  registerEvent("click", "prevStep", prevStep);
  registerEvent("click", "saveProgress", saveProgress);

  setupFormListeners();

  return `
    <div class="d-flex justify-content-end mt-5">
    ${
      state.currentStep < state.test?.activeTest?.elements.length - 1 ?
      `<div class="text-decoration-none me-auto" data-event="saveProgress">
        <div class="button-outline d-flex align-items-center h-100">
          <span>${saveContent}</span>
        </div>
      </div>` : ''
    }
      
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
              <div class="text-decoration-none ${nextButtonDisabledClass}" data-event="nextStep">
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
