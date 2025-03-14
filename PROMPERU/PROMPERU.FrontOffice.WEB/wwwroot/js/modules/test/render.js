import FindBusinessForm from "./components/FindBusinessForm.js";
import Instrucciones from "./components/Instructions.js";
import NavigationButtons from "./components/NavigationButtons.js";
import renderSectionTitle from "./components/renderSectionTitle.js";
import { useState } from "./utils/useState.js";

import TestLayout from "./layouts/TestLayout.js";
import Quiz from "./components/Quiz.js";

const Render = (state) => {
    'render'
    const titleState = useState("");
    const component = useState("")

    if(!state.companyData){
        titleState.setState('Encuentra tu empresa')
        component.setState(FindBusinessForm())
    } else if(state.test.hasInstructions && state.currentStep == 'intro'){
        const instructions = state.test.instructions
        titleState.setState(instructions.title)
        component.setState(
            Instrucciones(instructions)+
            NavigationButtons()
        )
    } else {
        const data = state.test?.elements[state.currentStep]
        titleState.setState(data?.title || state.test?.testType.label)
        component.setState(
            Quiz(data)+
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