import { store } from "../state.js";
import { registerEvent } from "../utils/eventHandler.js";

const NavigationButtons = (
  showBack = true,
  showNext = true,
  backText = "Anterior",
  nextText = "Siguiente"
) => {
  const nextStep = () => {
    let currentStep = store.getState().currentStep;
    store.setState({ previusStep: currentStep });

    if (typeof currentStep !== "number") {
      store.setState({ currentStep: 0 });
      return;
    }
    if (
      currentStep + 1 >=
      store.getState().test?.testDiagnostico?.elements.length
    ) {
      store.setState({ currentStep: "results" });
      return;
    }
    store.setState({ currentStep: currentStep + 1 });
  };

  const prevStep = () => {
    const currentStep = store.getState().currentStep;
    if (typeof currentStep === "number" && currentStep > 0) {
      store.setState({ currentStep: currentStep - 1 });
    }
  };

  registerEvent("click", "nextStep", nextStep);
  registerEvent("click", "prevStep", prevStep);

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
