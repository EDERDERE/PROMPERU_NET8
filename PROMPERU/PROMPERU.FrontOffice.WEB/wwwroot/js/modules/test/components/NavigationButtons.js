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

    // 1) Si el paso actual es un formulario, lo validamos antes de avanzar
    if (activeElement && activeElement.type === "form") {
      const formEl = document.getElementById("userForm");
      if (formEl) {
        // Limpia la clase por si el usuario corrigió campos después de un intento fallido
        formEl.classList.remove("was-validated");

        // Verificamos la validez del formulario
        if (!formEl.checkValidity()) {
          // Agrega la clase de Bootstrap que muestra los errores en cada campo
          formEl.classList.add("was-validated");
          return; // Detenemos aquí para que no avance
        }
      }
    }

    // 2) Si no es un formulario o es válido, avanzamos al siguiente paso
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
