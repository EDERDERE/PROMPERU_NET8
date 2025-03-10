import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function setupPreguntas() {
  const containerId = "preguntaContainer";
  let items = [];

  function agregarItem() {
    const itemId = `item-${items.length}`;
    items.push(itemId);

    const itemHTML = `
      <div class="card p-3 mb-4 shadow-sm" id="${itemId}">
          <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Elemento ${items.length}</h5>
              <button type="button" class="btn btn-danger btn-sm removeItem" data-id="${itemId}">X</button>
          </div>
          <hr>

          <div class="mb-3">
              <label class="form-label">Selecciona el tipo de contenido</label>
              <select class="form-select tipoContenido">
                  <option value="" selected disabled>Selecciona</option>
                  <option value="pregunta">Pregunta</option>
                  <option value="formulario">Formulario</option>
                  <option value="portada">Portada</option>
              </select>
          </div>

          <div class="contenidoDinamico" id="contenido-${itemId}"></div>
      </div>
    `;

    document
      .getElementById("preguntaLista")
      .insertAdjacentHTML("beforeend", itemHTML);
  }

  renderTemplate(
    containerId,
    () => `
      <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Elementos del Test</h4>
          <button type="button" class="btn btn-success" id="addItem">Añadir Elemento</button>
      </div>
      <div id="preguntaLista"></div>
    `
  );

  document.getElementById("addItem").addEventListener("click", agregarItem);

  document
    .getElementById("preguntaLista")
    .addEventListener("change", function (event) {
      const target = event.target;
      const itemCard = target.closest(".card");

      if (target.classList.contains("tipoContenido")) {
        const contenidoDinamico = itemCard.querySelector(".contenidoDinamico");
        const contenidoId = contenidoDinamico.id;

        if (target.value === "pregunta") {
          renderPregunta(contenidoId);
        } else if (target.value === "formulario") {
          renderFormulario(contenidoId);
        } else if (target.value === "portada") {
          renderPortada(contenidoId);
        } else {
          renderTemplate(contenidoId, "");
        }
      }
    });

  function renderPregunta(containerId) {
    renderTemplate(
      containerId,
      () => `
          <div class="mb-3">
              <label class="form-label">Pregunta</label>
              <input type="text" class="form-control preguntaInput" required>
          </div>

          <div class="mb-3">
              <label class="form-label">Tipo de Pregunta</label>
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
              <h6 class="title-respuesta">Respuestas</h6>
              <button type="button" class="btn btn-primary btn-sm addRespuesta">Agregar Respuesta</button>
              <div class="listaRespuestas mt-2"></div>
          </div>
      `
    );
  }

  function renderFormulario(containerId) {
    renderTemplate(
      containerId,
      () => `
        <div class="mb-3">
            <label for="selectFormulario" class="form-label">Selecciona un formulario</label>
            <select id="selectFormulario" class="form-select">
                <option value="" selected disabled>Selecciona un formulario</option>
                <option value="formulario1">Formulario 1</option>
                <option value="formulario2">Formulario 2</option>
            </select>
        </div>
      `
    );
  }

  function renderPortada(containerId) {
    renderTemplate(
      containerId,
      () => `
        <div class="card p-4 shadow-sm">
            <div class="mb-3">
                <label for="tituloPortada" class="form-label">Título de Portada</label>
                <input type="text" id="tituloPortada" class="form-control">
            </div>

            <div class="mb-3">
                <label for="descripcionPortada" class="form-label">Descripción</label>
                <div id="descripcionPortada-${containerId}" class="form-control" style="height: 150px;"></div>
            </div>
        </div>
      `
    );

    setTimeout(() => {
      const quillContainer = document.getElementById(
        `descripcionPortada-${containerId}`
      );
      if (quillContainer) {
        new Quill(`#descripcionPortada-${containerId}`, { theme: "snow" });
      }
    }, 100);
  }

  // **Lógica para Computable y No Computable + Manejo de Tipo de Respuesta**
  document
    .getElementById("preguntaLista")
    .addEventListener("change", function (event) {
      const target = event.target;
      const preguntaCard = target.closest(".card");

      if (!preguntaCard) return;

      const computableSection =
        preguntaCard.querySelector(".computableSection");
      const noComputableSection = preguntaCard.querySelector(
        ".noComputableSection"
      );
      const respuestaContainer = preguntaCard.querySelector(".listaRespuestas");
      const addRespuestaButton = preguntaCard.querySelector(".addRespuesta");
      const titleAnswer = preguntaCard.querySelector(".title-respuesta");

      if (target.classList.contains("tipoPregunta")) {
        if (target.value === "computable") {
          computableSection.classList.remove("d-none");
          noComputableSection.classList.add("d-none");
        } else if (target.value === "no_computable") {
          noComputableSection.classList.remove("d-none");
          computableSection.classList.add("d-none");
        }
      }

      if (target.classList.contains("tipoRespuesta")) {
        if (!respuestaContainer) return;

        respuestaContainer.innerHTML = "";

        if (target.value === "texto") {
          respuestaContainer.innerHTML = `
          <label class="form-label">Respuesta</label>
          <input type="text" class="form-control respuestaTexto" placeholder="Escribe la respuesta aquí">
        `;

          if (addRespuestaButton) {
            addRespuestaButton.style.display = "none";
            titleAnswer.style.display = "none";
          }
        } else {
          respuestaContainer.innerHTML = `<div class="listaRespuestas mt-2"></div>`;

          if (addRespuestaButton) {
            addRespuestaButton.style.display = "inline-block";
          }
        }
      }
    });

  // **Agregar respuestas dinámicamente**
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

  // **Eliminar respuestas dinámicamente**
  document
    .getElementById("preguntaLista")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("removeRespuesta")) {
        const respuestaId = event.target.getAttribute("data-id");
        document.getElementById(respuestaId).remove();
      }
    });
}
