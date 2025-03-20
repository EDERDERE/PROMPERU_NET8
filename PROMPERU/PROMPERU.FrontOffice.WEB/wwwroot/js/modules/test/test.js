import { store } from "./state.js";
import Render from "./render.js";

const container = document.getElementById("app");

export function init() {
  container.innerHTML = Render(store.getState());
  store.subscribe((newState) => {
    container.innerHTML = Render(newState);
    const state = store.getState();
    console.log(state);

    // TODO: Llenar formularios
  });
}
