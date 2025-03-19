import { renderForm } from "../utils/renderForm.js";
import { registerEvent } from "../utils/eventHandler.js";
import { store } from "../state.js";

import form from "../forms/index.js";
const Quiz = (data) => {
    const selectOption = (e) =>{
      const target = e.target
      const index = parseInt(target.dataset.option)

      let state = store.getState()
      let currentTest = state.test.testDiagnostico.elements[state.currentStep]
      if(data.answerType == 'multipleChoice'){
        const currentOptions = currentTest?.selectOption || []
        if(currentOptions.includes(index)) {
          currentTest.selectOption = currentOptions.filter(item => item !== index)
        }else{
          currentOptions.push(index)
          currentTest.selectOption = currentOptions
        }
      }else{
        currentTest.selectOption = [index]
      }
      store.setState({test: state.test})
    } 

    registerEvent("click", "quizOption", selectOption);
    const renderOptions = () =>{
        const alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
        return data.answers.map((item, index) => {
            return `
            <div class="question-box mb-3 ${data?.selectOption && data?.selectOption.includes(index) ? 'selected':''}" data-event="quizOption" data-option=${index}>
                <span class="option-label">${alphabet[index]}</span> ${item.text}
            </div>
            `
        }).join('')
    }

    const renderInput = () =>{
      return `
      <div class="mt-5 mb-4 d-flex justify-content-center align-items-center flex-column">
          <input type="text" class="form-control num_ruc py-3 px-4" id="text-answer-${data.id}" placeholder="Escribe tu respuesta">
      </div>
      `
    }

    const questionLayout = (content) =>{
      return `
       <section>
        <div class="container">
          <div class="col-11 mx-auto">
            <div class="d-flex justify-content-start">
              <span class="progress-indicator">1 <i>de</i> 55</span>
            </div>
            <h2 class="question-title mt-4 mb-4">${data.category}</h2>
            <p class="text-muted">${data.questionText}</p>
            <div class="mt-5">
            ${content}
            </div>
          </div>
        </div>
      </section>
      `
    }

    const coverLayout = (content) =>{
      return `
       <section>
        <div class="container">
            <div class="text">
                ${content}
            </div>
        </div>
    </section>
      `
    }

    const component = () => {
      if(data.type == 'question'){
        if(data.answerType == 'text'){
          return questionLayout(renderInput())
        }
        return questionLayout(renderOptions())
      }

      if(data.type == 'cover'){
        return coverLayout(data.description)
      }

      if(data.type == 'form'){
        return renderForm(form[data.selectedForm.value])
      }
    }

    return component()
}

export default Quiz;