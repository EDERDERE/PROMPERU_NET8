import FindBusinessForm from "./components/FindBusinessForm.js";
import Instrucciones from "./components/Instructions.js";
import NavigationButtons from "./components/NavigationButtons.js";
import renderSectionTitle from "./components/renderSectionTitle.js";
import TestSteps from "./components/TestSteps.js";
import { useState } from "./utils/useState.js";
import Quiz from "./components/Quiz.js";
import StepProgress from "./components/StepProgress.js";
import form from "./forms/index.js";
import WhatsAppFloat from "./components/WhatsappFloating.js";
import Results from "./components/results.js";

const Render = (state) => {
  const component = useState("");

  const stepsHtml = state.inscriptions
    ? TestSteps(state.inscriptions)
    : TestSteps();

  if (state.currentStep !== "results") {
    if (!state.companyData) {
      const title = "Encuentra tu empresa";
      component.setState(
        stepsHtml + renderSectionTitle(title) + FindBusinessForm()
      );
    } else if (
      state.test?.activeTest?.hasInstructions &&
      state.currentStep == "intro"
    ) {
      const instructions = state.test.activeTest.instructions;
      const title = instructions.title;
      component.setState(
        TestSteps() +
          renderSectionTitle(title) +
          Instrucciones(instructions) +
          NavigationButtons(false, true, "", instructions.buttonText)
      );
    } else {
      const elements = state.test?.activeTest?.elements || [];
      let currentStep = state.currentStep;

      const data = elements[currentStep];
      let title = data?.title || state.test?.activeTest?.testType.label;

      if (data?.type === "form" && data.selectedForm?.value) {
        const formSchema = form[data.selectedForm.value];
        if (formSchema?.title) {
          title = formSchema.title;
        }
      }
      const stepProgressHtml = StepProgress();

      const showBack = state.currentStep > 0;
      const totalElements = state.test.activeTest.elements.length;
      const isLastElement =
        typeof state.currentStep === "number" &&
        state.currentStep === totalElements - 1;
      const nextText = isLastElement ? "Enviar" : "Siguiente";

      component.setState(
        TestSteps() +
          renderSectionTitle(title) +
          stepProgressHtml +
          Quiz(data) +
          NavigationButtons(showBack, true, "Anterior", nextText)
      );
    }
  } else {
    component.setState(TestSteps() + Results());
  }
  const componentRender = component.getState() + WhatsAppFloat();

  return componentRender;
};

export default Render;
