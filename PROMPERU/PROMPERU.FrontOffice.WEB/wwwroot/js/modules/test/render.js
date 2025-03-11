import FindBusinessForm from "./components/FindBusinessForm.js";
import Instrucciones from "./components/Instructions.js";
import NavigationButtons from "./components/NavigationButtons.js";
import renderSectionTitle from "./components/renderSectionTitle.js";
import { useState } from "./utils/useState.js";

import TestLayout from "./layouts/TestLayout.js";

const Render = (state) => {
    const titleState = useState("");
    const component = useState("")

    if(!state.companyData){
        titleState.setState('Encuentra tu empresa')
        component.setState(FindBusinessForm())
    } else if(state.test.hasInstructions){
        const instructions = state.test.instructions
        titleState.setState(instructions.title)
        component.setState(
            Instrucciones(instructions)+
            NavigationButtons()
        )
    }

    const title = titleState.getState()
    const componentRender = component.getState()
    const sectionTitle = renderSectionTitle(title)


    return TestLayout(
        sectionTitle,
        componentRender
    )
}

export default Render;