import { init } from "./test.js";
import { store } from "./state.js";

document.addEventListener("DOMContentLoaded", () => {
  const persistantState = localStorage.getItem("state");
  if (persistantState) {
    const persistantStateJson = JSON.parse(persistantState);
    store.setState(persistantStateJson);
  }
  console.log(store.getState());
  init();
});
