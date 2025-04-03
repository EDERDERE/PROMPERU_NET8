import { store } from "./state.js";
import Render from "./render.js";
import { setupCascadingSelects } from "./utils/setupCascadingSelects.js";
import { attachFormListeners } from "./utils/attachFormListeners.js";
import { preloadInscriptions } from "./services/getSteps.js";
import { preloadLogos } from "./services/getLogos.js";
import { startInactivityMonitor } from "./utils/inactivityMonitor.js";

const container = document.getElementById("app");

export async function init() {
  await preloadInscriptions();
  await preloadLogos();
  container.innerHTML = Render(store.getState());
  attachFormListeners();
  setupCascadingSelects();

  window.addEventListener("beforeunload", (e) => {
    const state = store.getState();
    if (state.dataIsUpdated) {
      e.preventDefault();
      e.returnValue =
        "¿Estás seguro de que quieres salir? Tu progreso se perderá.";
    }
  });

  store.subscribe((newState) => {
    container.innerHTML = Render(newState);
    const state = store.getState();
    console.log(state);

    attachFormListeners();
    setupCascadingSelects();
  });

  startInactivityMonitor();
}
