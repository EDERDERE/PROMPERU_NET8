const Quiz = (data) => {

    const renderOptions = () =>{
        const alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
        return data.answers.map((item, index) => {
            return `
            <div class="question-box mb-3">
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
        return coverLayout(data.selectedForm.label)
      }
    }

    return component()
}

export default Quiz;