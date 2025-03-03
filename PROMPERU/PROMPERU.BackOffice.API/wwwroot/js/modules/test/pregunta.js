import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function setupPreguntas() {
  const containerId = "preguntaContainer";
  let preguntas = [];

  function agregarPregunta() {
    const preguntaId = `pregunta-${preguntas.length}`;
    preguntas.push(preguntaId);

    const preguntaHTML = `
      <div class="card p-3 mb-4 shadow-sm" id="${preguntaId}">
          <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Pregunta ${preguntas.length}</h5>
              <button type="button" class="btn btn-danger btn-sm removePregunta" data-id="${preguntaId}">X</button>
          </div>
          <hr>


          <div class="mb-3">
              <label for="pregunta" class="form-label">Pregunta</label>
              <input type="text" class="form-control preguntaInput" required>
          </div>

       
          <div class="mb-3">
              <label for="tipoPregunta" class="form-label">Tipo de Pregunta</label>
              <select class="form-select tipoPregunta">
                  <option value="" selected disabled>Selecciona</option>
                  <option value="computable">Computable</option>
                  <option value="no_computable">No Computable</option>
              </select>
          </div>

     
          <div class="mb-3 d-none computableSection">
              <label class="form-label">Seleccionar Curso</label>
              <select class="form-select curso">
                  <option value="" selected disabled>Selecciona un curso</option>
                  <option value="curso1">Curso 1</option>
                  <option value="curso2">Curso 2</option>
              </select>
          </div>

        
          <div class="mb-3 d-none noComputableSection">
              <label class="form-label">Categoría</label>
              <input type="text" class="form-control categoriaTexto">
          </div>

     
          <div class="mb-3">
              <label class="form-label">Tipo de Respuesta</label>
              <select class="form-select tipoRespuesta">
                  <option value="" selected disabled>Selecciona</option>
                  <option value="multiple">Múltiple Selección</option>
                  <option value="unica">Única Respuesta</option>
                  <option value="texto">Texto</option>
              </select>
          </div>

         
          <div class="mb-3">
              <h6>Respuestas</h6>
              <button type="button" class="btn btn-primary btn-sm addRespuesta">Agregar Respuesta</button>
              <div class="listaRespuestas mt-2"></div>
          </div>
      </div>
    `;

    document
      .getElementById("preguntaLista")
      .insertAdjacentHTML("beforeend", preguntaHTML);
  }

  renderTemplate(
    containerId,
    () => `
      <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Preguntas</h4>
          <button type="button" class="btn btn-success" id="addPregunta">Añadir Pregunta</button>
      </div>
      <div id="preguntaLista"></div>
    `
  );

  document
    .getElementById("addPregunta")
    .addEventListener("click", agregarPregunta);

  document
    .getElementById("preguntaLista")
    .addEventListener("change", function (event) {
      const target = event.target;
      const preguntaCard = target.closest(".card");

      if (target.classList.contains("tipoPregunta")) {
        const computableSection =
          preguntaCard.querySelector(".computableSection");
        const noComputableSection = preguntaCard.querySelector(
          ".noComputableSection"
        );

        if (target.value === "computable") {
          computableSection.classList.remove("d-none");
          noComputableSection.classList.add("d-none");
        } else if (target.value === "no_computable") {
          noComputableSection.classList.remove("d-none");
          computableSection.classList.add("d-none");
        }
      }
    });

  document
    .getElementById("preguntaLista")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("addRespuesta")) {
        const preguntaCard = event.target.closest(".card");
        const tipoRespuesta =
          preguntaCard.querySelector(".tipoRespuesta").value;
        const listaRespuestas = preguntaCard.querySelector(".listaRespuestas");

        if (!tipoRespuesta) {
          alert("Selecciona un tipo de respuesta primero.");
          return;
        }

        const respuestaId = `respuesta-${Date.now()}`;
        let respuestaHTML = `<div class="d-flex gap-2 mb-2" id="${respuestaId}">
            <input type="text" class="form-control respuesta-texto" placeholder="Texto de la respuesta">
        `;

        if (tipoRespuesta !== "texto") {
          respuestaHTML += `<input type="number" class="form-control respuesta-valor" placeholder="Valor (solo si es computable)" step="0.1">`;
        }

        respuestaHTML += `<button type="button" class="btn btn-danger btn-sm removeRespuesta" data-id="${respuestaId}">X</button></div>`;

        listaRespuestas.insertAdjacentHTML("beforeend", respuestaHTML);
      }
    });

  document
    .getElementById("preguntaLista")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("removeRespuesta")) {
        const respuestaId = event.target.getAttribute("data-id");
        document.getElementById(respuestaId).remove();
      }
    });

  document
    .getElementById("preguntaLista")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("removePregunta")) {
        const preguntaId = event.target.getAttribute("data-id");
        document.getElementById(preguntaId).remove();
        preguntas = preguntas.filter((id) => id !== preguntaId);
      }
    });
}
