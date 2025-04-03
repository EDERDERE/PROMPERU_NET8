import { renderForm } from "../utils/renderForm.js";
import { registerEvent } from "../utils/eventHandler.js";
import { store } from "../state.js";
import form from "../forms/index.js";
import { CoverLayout } from "./CoverLayout.js";
import { QuestionLayout } from "./QuestionLayout.js";
import { InputComponent } from "./InputComponent.js";
import { OptionsComponent } from "./OptionsComponent.js";

const Quiz = (data) => {
  const selectOption = (e) => {
    const target = e.target;
    const id = parseInt(target.dataset.option);

    let state = store.getState();
    let currentTest = state.test.activeTest.elements[state.currentStep];
    if (data.answerType == "multipleChoice") {
      const currentOptions = currentTest?.selectAnswers || [];
      if (currentOptions.some(item => item.id === id)) {
        currentTest.selectAnswers = currentOptions.filter(
          (item) => item.id !== id
        );
      } else {
        currentOptions.push({  id });
        currentTest.selectAnswers = currentOptions;
      }
    } else {
      currentTest.selectAnswers = [{ id }];
    }
    store.setState({ test: state.test, dataIsUpdated: true });
  };

  const handleInput = (e) => {
    const input = e.target.value;

    let state = store.getState();
    let currentTest = state.test.activeTest.elements[state.currentStep];
    currentTest.selectAnswers = [{ input }];
    store.setState({ test: state.test, dataIsUpdated: true });
  };

  registerEvent("click", "quizOption", selectOption);
  registerEvent("change", "handleInput", handleInput);

  const component = () => {

    if (!data) return null;
    
    if (data.type === "question") {
      const subTitle = data.isComputable ? data.course.label : data.category;
      const content =
        data.answerType === "text"
          ? InputComponent({ id: data.id, selectAnswers: data.selectAnswers })
          : OptionsComponent({
              answers: data.answers,
              selectAnswers: data.selectAnswers,
            });
      return QuestionLayout({
        subTitle,
        questionText: data.questionText,
        content,
      });
    }
    if (data.type == "cover") {
      return CoverLayout(data.description);
    }

    if (data.type == "form") {
      const state = store.getState();

      const initialData = {
        ...state.companyData,
        errors: state.errors || {},
      };
      return renderForm(form[data.selectedForm.value], initialData);
    }
  };

  return component();
};

export default Quiz;
