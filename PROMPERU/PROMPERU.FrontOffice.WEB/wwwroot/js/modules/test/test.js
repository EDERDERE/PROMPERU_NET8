import { store } from "./state.js";
import Render from "./render.js";
import { preloadInscriptions } from "./utils/preloadInscriptions.js";
import { setupCascadingSelects } from "./utils/setupCascadingSelects.js";
import { attachFormListeners } from "./utils/attachFormListeners.js";

const container = document.getElementById("app");

export async function init() {
  await preloadInscriptions();
  container.innerHTML = Render(store.getState());
  attachFormListeners();
  setupCascadingSelects();
  
  store.subscribe((newState) => {
    container.innerHTML = Render(newState);
    const state = store.getState();
    console.log(state);

    attachFormListeners();
    setupCascadingSelects();
  });
}
