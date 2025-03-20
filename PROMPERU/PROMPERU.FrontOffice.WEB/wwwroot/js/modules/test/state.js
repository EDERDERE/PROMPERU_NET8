import { createState } from "./utils/store.js";

export const store = createState({
  companyData: null,
  test: null,
  currentStep: 0,
  previusStep: null,
  answers: null,
  loading: false,
});
