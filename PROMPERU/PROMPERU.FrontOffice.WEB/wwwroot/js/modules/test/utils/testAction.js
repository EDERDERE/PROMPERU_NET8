import { saveTestProgress } from "../services/postTest.js";
import { store } from "../state.js";

export async function updateSaveTest() {
  const state = store.getState();
  const { steps, activeTest } = state.test;
  const companyData = state.companyData;

  const { instructions, hasInstructions, ...cleanActiveTestTop } = activeTest;

  const cleanedActiveTest = {
    ...cleanActiveTestTop,
    elements: activeTest.elements.map((element) => {
      let isComplete = false;
      if (element.type === "form" || element.type === "cover") {
        isComplete = true;
      } else if (element.type === "question") {
        if (
          Array.isArray(element.selectAnswers) &&
          element.selectAnswers.length > 0
        ) {
          isComplete = true;
        }
      }
      return { ...element, isComplete };
    }),
  };
  const saveTest = {
    steps,
    activeTest: cleanedActiveTest,
    companyData,
  };

  store.setState({ saveTest });



  // try {
  //   const response = await saveTestProgress(saveTest);
  //   console.log("Progreso del test guardado correctamente:", response);
  // } catch (error) {
  //   console.error("Error al guardar el progreso del test:", error);
  // }
}
