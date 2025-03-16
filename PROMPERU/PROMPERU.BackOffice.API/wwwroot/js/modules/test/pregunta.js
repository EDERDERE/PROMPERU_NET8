import { renderTemplate } from "../../../shared/js/renderTemplate.js";

import { fetchData } from "../../../shared/js/apiService.js";

let coursesList = [];

let contadorPreguntas = 0;

function generarIdPregunta() {
  contadorPreguntas++;
  return `pregunta-${Date.now()}-${contadorPreguntas}`;
}

export function renderPregunta(containerId) {
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
                  ${coursesList
                    .map(
                      (course) =>
                        `<option value="${course.value}">${course.label}</option>`
                    )
                    .join("")}
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

        <div class="mb-3 content-respuestas" >
            <button type="button" class="btn btn-primary btn-sm addRespuesta">Agregar Respuesta</button>
            <div class="listaRespuestas mt-2"></div>
        </div>

        <div class="mb-3 respuesta-texto-block" style="display:none;">
            <label class="form-label">Agrega placeholder</label>
            <input type="text" class="form-control respuestaTextoUnica" placeholder="Escribe la respuesta aquí">
        </div>
    `
  );
}

export function renderFormulario(containerId) {
  renderTemplate(
    containerId,
    () => `
      <div class="mb-3">
          <label for="selectFormulario-${containerId}" class="form-label">Selecciona un formulario</label>
          <select id="selectFormulario-${containerId}" class="form-select">
              <option value="" selected disabled>Selecciona un formulario</option>
              <option value="formulario1">Formulario 1</option>
              <option value="formulario2">Formulario 2</option>
          </select>
      </div>
    `
  );
}

export function renderPortada(containerId) {
  renderTemplate(
    containerId,
    () => `
      <div class="card p-4 shadow-sm">
          <div class="mb-3">
              <label for="tituloPortada-${containerId}" class="form-label">Título de Portada</label>
              <input type="text" id="tituloPortada-${containerId}" class="form-control">
          </div>

          <div class="mb-3">
              <label for="descripcionPortada-${containerId}" class="form-label">Descripción</label>
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

export function agregarPregunta(data = {}, order = null) {

  console.log(order)
  const preguntaLista = document.getElementById("preguntaLista");
  if (!preguntaLista) return;

  const itemId = generarIdPregunta();
  const containerId = `contenido-${itemId}`;
  const tipo = data.type || "question";
  const finalOrder = order ?? "Nuevo";
  const elementIdAttr = data.id ? data.id : "";

  const preguntaHTML = `
    <div class="card p-3 mb-4 shadow-sm" id="${itemId}" data-elementid="${elementIdAttr}">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Elemento ${finalOrder}</h5>
            <button type="button" class="btn btn-danger btn-sm removeItem" data-id="${itemId}">X</button>
        </div>
        <hr>

        <div class="mb-3">
            <label class="form-label">Selecciona el tipo de contenido</label>
            <select class="form-select tipoContenido">
                <option value="pregunta" ${
                  tipo === "question" ? "selected" : ""
                }>Pregunta</option>
                <option value="formulario" ${
                  tipo === "form" ? "selected" : ""
                }>Formulario</option>
                <option value="portada" ${
                  tipo === "cover" ? "selected" : ""
                }>Portada</option>
            </select>
        </div>

        <div class="contenidoDinamico" id="${containerId}"></div>
    </div>
  `;

  preguntaLista.insertAdjacentHTML("beforeend", preguntaHTML);

  if (tipo === "question") {
    renderPregunta(`contenido-${itemId}`);
    fillPreguntaData(itemId, data);
  } else if (tipo === "form") {
    renderFormulario(`contenido-${itemId}`);
    fillFormularioData(`contenido-${itemId}`, data);
  } else if (tipo === "cover") {
    renderPortada(containerId);
    fillPortadaData(containerId, data);
  }

  if (data.type === "question") {
    const preguntaCard = document.getElementById(itemId);
    if (preguntaCard) {
      const preguntaInput = preguntaCard.querySelector(".preguntaInput");
      if (preguntaInput) preguntaInput.value = data.questionText || "";

      const tipoPreguntaSelect = preguntaCard.querySelector(".tipoPregunta");
      if (tipoPreguntaSelect)
        tipoPreguntaSelect.value = data.isComputable
          ? "computable"
          : "no_computable";
    }
  }
}

export async function cargarCursosYFormularios() {
  try {
    const response = await fetchData("/Test/ListarMaestros");

    if (!response || !response.success) {
      console.error("❌ Error al obtener los datos de cursos y formularios.");
      return;
    }

    coursesList = response.resuls.courses || [];

    console.log("✅ Cursos y Formularios cargados correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar cursos y formularios:", error);
  }
}

export function addRespuesta(listaRespuestas, tipoRespuesta, answer) {
  if (!listaRespuestas) return;

  const respuestaId = `respuesta-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const existingId = answer && answer.id ? answer.id : "";

  let respuestaHTML = `
    <div class="d-flex gap-2 mb-2" id="${respuestaId}" data-answerid="${existingId}">
      <input type="text" class="form-control respuesta-texto" placeholder="Texto de la respuesta" value="${
        answer.text || ""
      }">
  `;

  if (tipoRespuesta !== "texto") {
    respuestaHTML += `
      <input type="number" class="form-control respuesta-valor" placeholder="Valor (solo si es computable)" step="0.1" value="${
        answer.value ?? 0
      }">
    `;
  }

  respuestaHTML += `
      <button type="button" class="btn btn-danger btn-sm removeRespuesta" data-id="${respuestaId}">X</button>
    </div>
  `;

  listaRespuestas.insertAdjacentHTML("beforeend", respuestaHTML);
}

export function setupPreguntas() {
  const containerId = "preguntaContainer";
  let items = [];

  function agregarItem() {
    const cards = document.querySelectorAll("#preguntaLista > .card[id^='pregunta-']");
    const numCards = cards.length;
    const order = numCards + 1;
    const itemId = `item-${Date.now()}-${order}`;
    items.push(itemId);

    const itemHTML = `
      <div class="card p-3 mb-4 shadow-sm" id="${itemId}" data-elementid="">
          <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Elemento ${order}</h5>
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

  // **Lógica para Computable y No Computable + Manejo de Tipo de Respuesta**
  document
    .getElementById("preguntaLista")
    .addEventListener("change", function (event) {
      if (window.isFilling) return;
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

        const respuestasBlock = preguntaCard.querySelector(".respuestas-block");
        const respuestaTextoBlock = preguntaCard.querySelector(
          ".respuesta-texto-block"
        );

        if (target.value === "texto") {
          if (respuestasBlock) respuestasBlock.style.display = "none";
          if (respuestaTextoBlock) respuestaTextoBlock.style.display = "block";

          if (addRespuestaButton) {
            addRespuestaButton.style.display = "none";
          }
        } else {
          respuestaContainer.innerHTML = `<div class="listaRespuestas mt-2"></div>`;
          if (respuestaTextoBlock) respuestaTextoBlock.style.display = "none";

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

  // **Eliminar elementos dinámicamente**
  document
    .getElementById("preguntaLista")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("removeItem")) {
        const itemId = event.target.getAttribute("data-id");
        const itemElement = document.getElementById(itemId);

        if (itemElement) {
          itemElement.remove();

          items = items.filter((item) => item !== itemId);
        }
      }
    });
}

export function obtenerPreguntas() {
  const preguntas = [];
  const elementos = document.querySelectorAll("#preguntaLista .card");

  elementos.forEach((card, index) => {
    const tipoContenido = card.querySelector(".tipoContenido")?.value;

    if (!tipoContenido) {
      console.warn(`⚠️ Elemento ${index + 1} no tiene tipo de contenido.`);
      return;
    }

    let elemento = {
      order: index + 1,
      type:
        tipoContenido === "pregunta"
          ? "question"
          : tipoContenido === "portada"
          ? "cover"
          : tipoContenido === "formulario"
          ? "form"
          : null,
    };

    const idValue = card.getAttribute("data-elementid");
    elemento.id = idValue ? Number(idValue) : null;

    if (tipoContenido === "pregunta") {
      elemento.questionText = card.querySelector(".preguntaInput")?.value || "";
      const isComputable =
        card.querySelector(".tipoPregunta")?.value === "computable";
      elemento.isComputable = isComputable;
      if (isComputable) {
        const selectCurso = card.querySelector(".curso");
        if (selectCurso) {
          const selectedOption = selectCurso.options[selectCurso.selectedIndex];
          elemento.course = {
            value: Number(selectCurso.value),
            label: selectedOption ? selectedOption.textContent : "",
          };
        }
      } else {
        elemento.category = card.querySelector(".categoriaTexto")?.value || "";
      }

      const tipoRespuesta = card.querySelector(".tipoRespuesta")?.value;
      elemento.answerType =
        tipoRespuesta === "unica"
          ? "singleChoice"
          : tipoRespuesta === "multiple"
          ? "multipleChoice"
          : tipoRespuesta === "texto"
          ? "text"
          : null;

      // **Obtener respuestas**

      if (elemento.answerType === "text") {
        const respuestaInput = card.querySelector(".respuestaTextoUnica");
        elemento.label = respuestaInput ? respuestaInput.value : "";
        elemento.answers = [];
      }
      const respuestas = [];
      card
        .querySelectorAll(".listaRespuestas > div")
        ?.forEach((respDiv, idx) => {
          const text = respDiv.querySelector(".respuesta-texto")?.value || "";
          const value =
            parseFloat(respDiv.querySelector(".respuesta-valor")?.value) || 0;
          const answerId = respDiv.getAttribute("data-answerid");
          if (text.trim() !== "") {
            respuestas.push({
              id: answerId ? Number(answerId) : null,
              order: idx + 1,
              text,
              value,
            });
          }
        });

      elemento.answers = respuestas.length > 0 ? respuestas : null;
    }

    if (tipoContenido === "portada") {
      const tituloPortada = card.querySelector("[id^='tituloPortada-']");
      elemento.title = tituloPortada ? tituloPortada.value : "";
      const quillDescripcion = card.querySelector(".ql-editor");
      elemento.description = quillDescripcion ? quillDescripcion.innerHTML : "";
    }

    if (tipoContenido === "formulario") {
      const selectForm = card.querySelector("select[id^='selectFormulario-']");
      if (selectForm) {
        const formId = selectForm.getAttribute("data-selectedform-id") || null;
        elemento.selectedForm = {
          id: formId ? Number(formId) : null,
          value: selectForm.value,
          label: selectForm.options[selectForm.selectedIndex]?.text || "",
        };
      }
    }

    preguntas.push(elemento);
  });

  return preguntas;
}

export function llenarPreguntas(elements) {
  if (!elements || elements.length === 0) return;

  elements.forEach((element) => {
    agregarPregunta(element, element.order);
  });
}

function fillPreguntaData(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const preguntaInput = container.querySelector(".preguntaInput");
  if (preguntaInput) {
    preguntaInput.value = data.questionText || "";
  }

  const tipoPreguntaSelect = container.querySelector(".tipoPregunta");
  if (tipoPreguntaSelect) {
    tipoPreguntaSelect.value = data.isComputable
      ? "computable"
      : "no_computable";
  }

  const computableSection = container.querySelector(".computableSection");
  const noComputableSection = container.querySelector(".noComputableSection");
  if (data.isComputable) {
    if (computableSection) computableSection.classList.remove("d-none");
    if (noComputableSection) noComputableSection.classList.add("d-none");
  } else {
    if (computableSection) computableSection.classList.add("d-none");
    if (noComputableSection) noComputableSection.classList.remove("d-none");
  }

  if (data.isComputable) {
    const cursoSelect = container.querySelector(".curso");
    if (cursoSelect && data.course) {
      cursoSelect.value = data.course.value ?? "";
    }
  } else {
    const categoriaTexto = container.querySelector(".categoriaTexto");
    if (categoriaTexto) {
      categoriaTexto.value = data.category || "";
    }
  }

  const tipoRespuestaSelect = container.querySelector(".tipoRespuesta");
  const addRespuestaButton = container.querySelector(".addRespuesta");
  const respuestaContainer = container.querySelector(".listaRespuestas");
  const respuestaTextoBlock = container.querySelector(".respuesta-texto-block");
  const inputUnica = container.querySelector(".respuestaTextoUnica");

  if (tipoRespuestaSelect) {
    if (data.answerType === "singleChoice") {
      tipoRespuestaSelect.value = "unica";
    } else if (data.answerType === "multipleChoice") {
      tipoRespuestaSelect.value = "multiple";
    } else if (data.answerType === "text") {
      tipoRespuestaSelect.value = "texto";
    }

    if (tipoRespuestaSelect && tipoRespuestaSelect.value === "texto") {
      if (addRespuestaButton) {
        addRespuestaButton.style.display = "none";
      }

      if (respuestaContainer) {
        respuestaContainer.innerHTML = "";
      }

      if (respuestaTextoBlock) {
        respuestaTextoBlock.style.display = "block";
      }

      if (inputUnica) {
        inputUnica.value = data.label || "";
      }
    } else {
      if (respuestaTextoBlock) {
        respuestaTextoBlock.style.display = "none";
      }
    }
  }

  if (data.answers && data.answers.length > 0) {
    const addRespuestaButton = container.querySelector(".addRespuesta");
    const listaRespuestas = container.querySelector(".listaRespuestas");
    const tipoRespuesta = tipoRespuestaSelect?.value;
    if (tipoRespuesta === "texto" && addRespuestaButton) {
      addRespuestaButton.style.display = "none";
    }
    data.answers.forEach((answer) => {
      addRespuesta(listaRespuestas, tipoRespuesta, answer);
    });
  }
}

function fillFormularioData(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const selectFormulario = container.querySelector(
    `#selectFormulario-${containerId}`
  );
  if (selectFormulario && data.selectedForm) {
    selectFormulario.value = data.selectedForm.value || "";
    selectFormulario.setAttribute(
      "data-selectedform-id",
      data.selectedForm.id || ""
    );
  }
}

function fillPortadaData(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const card = container.closest(".card");
  if (card && data.id) {
    card.setAttribute("data-elementid", data.id);
  }

  const tituloPortada = container.querySelector(
    `#tituloPortada-${containerId}`
  );
  if (tituloPortada) {
    tituloPortada.value = data.title || "";
  }

  const descContainer = document.getElementById(
    `descripcionPortada-${containerId}`
  );
  if (descContainer) {
    const quillEditor = descContainer.querySelector(".ql-editor");
    if (quillEditor) {
      quillEditor.innerHTML = data.description || "";
    } else {
      descContainer.innerHTML = data.description || "";
    }
  }
}
