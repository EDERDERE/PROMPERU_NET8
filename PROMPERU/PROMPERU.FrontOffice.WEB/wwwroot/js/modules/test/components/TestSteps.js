import { store } from "../state.js";

const TestSteps = (customData = null) => {
  let stepsData = [];
  let isCustom = false;

  if (customData && Array.isArray(customData)) {
    stepsData = customData;
    isCustom = true;
  } else {
    stepsData = store.getState().test?.steps || [];
  }

  const steps = () => {
    if (stepsData.length) {
      if (isCustom) {
        return stepsData
          .sort((a, b) => a.insc_Orden - b.insc_Orden)
          .map((item) => {
            return `
              <div class="pasos">
                <div class="step-icon">
                  <img src="${item.insc_URLImagen}" alt="${item.insc_TituloPaso}" />
                </div>
                <div class="step-text">${item.insc_TituloPaso}</div>
              </div>
            `;
          })
          .join("");
      } else {
        const currentIndex = stepsData.findIndex((test) => test.current);
        return stepsData
          .map((test, index) => {
            return `
              <div class="pasos ${
                test.current || index < currentIndex ? "step_active" : ""
              }">
                <div class="step-icon ${
                  test.current || index < currentIndex ? "activado" : ""
                }">
                  <img src="${test.iconUrl}" alt="diagnostic" />
                </div>
                <div class="step-text">${test.iconName}</div>
              </div>
            `;
          })
          .join("");
      }
    }
    return "";
  };

  const progress = () => {
    if (!isCustom && stepsData.length) {
      const currentIndex = stepsData.findIndex((test) => test.current);
      if (currentIndex + 1 < stepsData.length) return currentIndex + 1;
      return currentIndex;
    }
    return 0;
  };

  return `
    <div class="bgwhite my-5 py-0">
      <div class="container">
        <div class="d-flex">
          <div class="steps-content mx-auto" style="--step-multipler:${progress()}">
            ${
              !isCustom
                ? `<div class="progress_bar" id="progreso_bar"></div>`
                : ""
            }
            ${steps()}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default TestSteps;
