import { store } from "./state.js";
import Render from "./render.js";
import { setupCascadingSelects } from "./utils/setupCascadingSelects.js";
import { attachFormListeners } from "./utils/attachFormListeners.js";
import { preloadInscriptions } from "./services/getSteps.js";

const container = document.getElementById("app");

export async function init() {
  await preloadInscriptions();
  container.innerHTML = Render(store.getState());
  attachFormListeners();
  setupCascadingSelects();

  // Add beforeunload event listener
  window.addEventListener('beforeunload', (e) => {
    const state = store.getState();
    // Check if there's any progress that would be lost
    if (state.dataIsUpdated) {
      e.preventDefault();
      e.returnValue = '¿Estás seguro de que quieres salir? Tu progreso se perderá.';
    }
  });

  store.subscribe((newState) => {
    container.innerHTML = Render(newState);
    const state = store.getState();
    console.log(state);

    attachFormListeners();
    setupCascadingSelects();
  });
}
