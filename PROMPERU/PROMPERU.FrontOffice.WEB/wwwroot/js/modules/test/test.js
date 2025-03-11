import { store } from "./state.js";
import test from "./mocks/test.js";
import Render from "./render.js";

const container = document.getElementById("app");

export function init() {
    store.subscribe((newState) => {
        container.innerHTML = Render(newState)
    });
    fetchTest()
}

async function fetchTest(){
    try {
        store.setState({ test });
    } catch (error) {
        
    }
}

