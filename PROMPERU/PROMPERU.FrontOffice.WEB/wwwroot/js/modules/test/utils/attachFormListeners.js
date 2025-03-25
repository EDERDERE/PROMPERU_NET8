import { store } from "../state.js";

export function attachFormListeners() {
  const formEl = document.getElementById("userForm");
  if (!formEl) return;

  const inputs = formEl.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const { name, value } = e.target;
      const state = store.getState();
      const currentData = state.companyData || {};
      const updatedData = { ...currentData, [name]: value };

      let errorMsg = "";
      if (!input.checkValidity()) {
        errorMsg = input.validationMessage || "Campo inválido";
      }

      const currentErrors = state.errors || {};
      const updatedErrors = { ...currentErrors, [name]: errorMsg };

      store.setState({
        companyData: updatedData,
        errors: updatedErrors,
      });
    });
  });
}
