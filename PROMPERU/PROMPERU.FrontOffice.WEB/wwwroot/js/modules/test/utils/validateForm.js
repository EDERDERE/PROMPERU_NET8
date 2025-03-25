export function validateFormIfNeeded(state) {
  const currentStep = state.currentStep;
  const activeElement = state.test?.activeTest?.elements[currentStep];
  if (activeElement && activeElement.type === "form") {
    const formEl = document.getElementById("userForm");
    if (formEl && !formEl.checkValidity()) {
      formEl.classList.add("was-validated");
      return false;
    }
  }
  return true;
}