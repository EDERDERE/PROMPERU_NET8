import { renderForm } from "../utils/renderForm.js";
import { registerEvent } from "../utils/eventHandler.js";
import { store } from "../state.js";
import form from "../forms/index.js";

const Quiz = (data) => {
  const selectOption = (e) => {
    const target = e.target;
    const id = parseInt(target.dataset.option);

    let state = store.getState();
    let currentTest = state.test.activeTest.elements[state.currentStep];
    if (data.answerType == "multipleChoice") {
      const currentOptions = currentTest?.selectAnswers || [];
      if (currentOptions.includes(id)) {
        currentTest.selectAnswers = currentOptions.filter(
          (item) => item.id !== id,
        );
      } else {
        currentOptions.push({id});
        currentTest.selectAnswers = currentOptions;
      }
    } else {
      currentTest.selectAnswers = [{id}];
    }
    store.setState({ test: state.test });
  };

  registerEvent("click", "quizOption", selectOption);
  const renderOptions = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return data.answers
      .map((item, index) => {
        return `
            <div class="question-box mb-3 ${
              data?.selectAnswers && data?.selectAnswers.find(answer => answer.id == item.id)
                ? "selected"
                : ""
            }" data-event="quizOption" data-option=${item.id}>
                <span class="option-label">${alphabet[index]}</span> ${
                  item.text
                }
            </div>
            `;
      })
      .join("");
  };

  const handleInput = (e) => {
    const input = e.target.value;

    let state = store.getState();
    let currentTest = state.test.activeTest.elements[state.currentStep];
    currentTest.selectAnswers = [{input}];
    store.setState({ test: state.test });
  }

  registerEvent("change", "handleInput", handleInput);
  const renderInput = () => {
    return `
      <div class="mt-5 mb-4 d-flex justify-content-center align-items-center flex-column">
          <input type="text" class="form-control num_ruc py-3 px-4" id="text-answer-${data.id}" placeholder="Escribe tu respuesta" data-event="handleInput" value="${data?.selectAnswers?.length ? data?.selectAnswers[0]?.input : ''}">
      </div>
      `;
  };

  const questionLayout = (content) => {
    let subTitle = "";
    if (data.isComputable) {
      subTitle = data.course.label;
    } else {
      subTitle = data.category;
    }
    return `
       <section>
        <div class="container">
          <div class="col-12 mx-auto">
           
            <h2 class="question-title mt-4 mb-4">  ${subTitle}</h2>
            <p class="text-muted">${data.questionText}</p>
            <div class="mt-5">
            ${content}
            </div>
          </div>
        </div>
      </section>
      `;
  };

  const coverLayout = (content) => {
    return `
       <section>
        <div class="container">
            <div class="text">
                ${content}
            </div>
        </div>
    </section>
      `;
  };

  const component = () => {
    if (data.type == "question") {
      if (data.answerType == "text") {
        return questionLayout(renderInput());
      }
      return questionLayout(renderOptions());
    }

    if (data.type == "cover") {
      return coverLayout(data.description);
    }

    if (data.type == "form") {
      const state = store.getState();

      const initialData = {
        ...state.companyData,
        ...(state.saveTest && state.saveTest.companyData
          ? state.saveTest.companyData
          : {}),
        errors: (state.saveTest && state.saveTest.errors) || {},
      };
      return renderForm(form[data.selectedForm.value], initialData);
    }
  };

  return component();
};

export default Quiz;
