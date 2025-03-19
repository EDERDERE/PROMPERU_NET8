import { store } from "./state.js";
import test from "./mocks/test.js";
import Render from "./render.js";

const container = document.getElementById("app");

export function init() {
  store.subscribe((newState) => {
    container.innerHTML = Render(newState);

    console.log("render", newState);
    console.log(newState.companyData || newState.test || newState.answers);

    if (newState.companyData || newState.test || newState.answers) {
      localStorage.setItem("persistantState", JSON.stringify(newState));
    }
  });
  fetchTest();
}

async function fetchTest() {
  try {
    store.setState({ test });
  } catch (error) {}
}
