import { store } from "../state.js";

const TestSteps = () => {
  const steps = () => {
    const tests = store.getState().test?.steps;
    if (tests.length) {
      const currentIndex = tests.findIndex((test) => test.current);
      return tests
        .map((test, index) => {
          return `
        <div class="pasos  ${
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

    return "";
  };

  const progress = () => {
    const tests = store.getState().test?.steps;
    if (tests.length) {
      const currentIndex = tests.findIndex((test) => test.current);

      if (currentIndex + 1 < tests.length) return currentIndex + 1;
      return currentIndex;
    }
    return 1;
  };

  return `
    <div class="bgwhite my-5 py-3">
      <div class="container">
        <div class="d-flex">
          <div class="steps-content mx-auto" style="--step-multipler:${progress()}">
            <div class="progress_bar" id="progreso_bar"></div>
            ${steps()}
          </div>
        </div>
      </div>
    </div>
    `;
};

export default TestSteps;
