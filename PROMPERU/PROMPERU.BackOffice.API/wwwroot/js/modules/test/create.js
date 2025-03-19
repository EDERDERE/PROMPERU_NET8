import { fetchData } from "../../../shared/js/apiService.js";
import { setupPortada } from "./portada.js";
import {
  setupPreguntas,
  obtenerPreguntas,
  cargarCursosYFormularios,
} from "./pregunta.js";
import { setupTestSelect } from "./testSelect.js";

document.addEventListener("DOMContentLoaded", async function () {
  await setupTestSelect();
  await cargarCursosYFormularios();
  setupPortada();
  setupPreguntas();

  document.getElementById("saveTest").addEventListener("click", guardarTest);
});

async function guardarTest() {
  const testTypeSelect = document.getElementById("selectTest");
  const selectPortada = document.getElementById("selectPortada");
  const tituloPortada = document.getElementById("tituloPortada");
  const quillDescripcion = document.querySelector(
    "#descripcionPortada .ql-editor"
  );
  const quillAlerta = document.querySelector("#alertaPortada .ql-editor");
  const iconoAlerta = document.getElementById("iconoAlerta");
  const textoBoton = document.getElementById("textoBoton");
  const iconoBoton = document.getElementById("iconoBoton");

  if (!testTypeSelect.value) {
    alert("⚠️ Debes seleccionar un tipo de Test.");
    return;
  }

  let elements = obtenerPreguntas();

  elements.forEach((elem, index) => {
    elem.order = index + 1;
    if (elem.answers && Array.isArray(elem.answers)) {
      elem.answers.forEach((answer, idx) => {
        answer.order = idx + 1;
      });
    }
  });

  const testData = {
    testType: {
      value: testTypeSelect.value,
      label: testTypeSelect.options[testTypeSelect.selectedIndex].text,
    },
    hasInstructions: selectPortada?.value === "si",
    instructions:
      selectPortada?.value === "si"
        ? {
            title: tituloPortada?.value || "",
            description: quillDescripcion?.innerHTML || "",
            alert: quillAlerta?.innerHTML || "",
            alertIcon: iconoAlerta?.value || "",
            buttonText: textoBoton?.value || "",
            buttonIcon: iconoBoton?.value || "",
          }
        : null,
    elements: elements,
  };

  console.log("📌 Enviando Test Data:", testData);

  try {
    const response = await fetchData("/Test/CrearTest", "POST", testData);
    if (response && response.success) {
      alert("✅ Test creado exitosamente.");
      window.location.href = "/Test";
    } else {
      alert("❌ Ocurrió un error al guardar el Test.");
    }
  } catch (error) {
    console.error("❌ Error al guardar el Test:", error);
  }
}
