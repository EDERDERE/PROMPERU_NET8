const Quill = window.Quill;
import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function setupPortada() {
  const selectPortadaContainerId = "selectPortadaContainer";
  const portadaContainerId = "portadaContainer";
  let quillInstance = null;

  // **Renderizar el Select de Portada en `selectPortadaContainer`**
  renderTemplate(
    selectPortadaContainerId,
    () => `

          <label for="selectPortada" class="form-label">¿Quieres instrucciones?</label>
          <select id="selectPortada" class="form-select">
              <option value="no" selected>No</option>
              <option value="si">Sí</option>
          </select>
     
    `
  );

  const selectPortada = document.getElementById("selectPortada");

  if (!selectPortada) return;

  selectPortada.addEventListener("change", function () {
    if (this.value === "si") {
      renderPortada();
    } else {
      renderTemplate(portadaContainerId, "");
    }
  });
}

export function renderPortada() {
  const portadaContainerId = "portadaContainer";

  renderTemplate(
    portadaContainerId,
    () => `
      <div class="row mt-4">  
          <div class="col-12">
              <div class="card p-4 shadow-sm">
                  <div class="row">
                      <div class="col-md-12">
                          <label for="tituloPortada" class="form-label">Título de Instrucción</label>
                          <input type="text" id="tituloPortada" class="form-control">
                      </div>

                      <div class="col-md-12 mt-3">
                          <label for="descripcionPortada" class="form-label">Descripción</label>
                          <div id="descripcionPortada" class="form-control" style="height: 150px;"></div>
                      </div>

                      <div class="col-md-6 mt-3">
                          <label for="alertaPortada" class="form-label">Alerta</label>
                          <div id="alertaPortada" class="form-control" style="height: 150px;"></div>
                      </div>

                      <div class="col-md-6 mt-3">
                          <label for="iconoAlerta" class="form-label">Ícono de Alerta</label>
                          <input type="text" id="iconoAlerta" class="form-control">
                      </div>

                      <div class="col-md-6 mt-3">
                          <label for="textoBoton" class="form-label">Texto del Botón</label>
                          <input type="text" id="textoBoton" class="form-control">
                      </div>

                      <div class="col-md-6 mt-3">
                          <label for="iconoBoton" class="form-label">Ícono del Botón</label>
                          <input type="text" id="iconoBoton" class="form-control">
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `
  );

  setTimeout(() => {
    new Quill("#descripcionPortada", { theme: "snow" });
    new Quill("#alertaPortada", { theme: "snow" });
  }, 50);
}

export function llenarPortada(instructions) {
  if (!instructions) return;

  const selectPortada = document.getElementById("selectPortada");
  if (selectPortada) {
    selectPortada.value = "si";
  }

  renderPortada();

  setTimeout(() => {
    document.getElementById("tituloPortada").value = instructions.title || "";
    document.getElementById("iconoAlerta").value = instructions.alertIcon || "";
    document.getElementById("textoBoton").value = instructions.buttonText || "";
    document.getElementById("iconoBoton").value = instructions.buttonIcon || "";

    const quillDescripcion = document.querySelector(
      "#descripcionPortada .ql-editor"
    );
    if (quillDescripcion)
      quillDescripcion.innerHTML = instructions.description || "";

    const quillAlerta = document.querySelector("#alertaPortada .ql-editor");
    if (quillAlerta) quillAlerta.innerHTML = instructions.alert || "";
  }, 100);
}
