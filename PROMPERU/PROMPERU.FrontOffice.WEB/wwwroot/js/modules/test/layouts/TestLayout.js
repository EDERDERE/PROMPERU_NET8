import TestSteps from "../components/TestSteps.js";

const TestLayout = (...components) =>{
    return [
        TestSteps(),
        ...components
    ].join('')
}

export default TestLayout;