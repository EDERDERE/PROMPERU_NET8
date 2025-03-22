import { store } from "../state.js";

export default function StepProgress() {
  const state = store.getState();
  const activeTest = state.test?.activeTest;

  if (!activeTest || !activeTest.elements) return "";

  const total = activeTest.elements.length;
  const currentIndex =
    typeof state.currentStep === "number" ? state.currentStep : 0;

  return `
    <div class="d-flex justify-content-start my-5">
      <span class="progress-indicator">
        ${currentIndex + 1} <i>de</i> ${total}
      </span>
    </div>
  `;
}
