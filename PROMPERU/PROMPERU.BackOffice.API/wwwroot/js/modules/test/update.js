import { setupTestSelect } from "./testSelect.js";
import { setupPortada, llenarPortada } from "./portada.js";
import { setupPreguntas, llenarPreguntas, obtenerPreguntas } from "./pregunta.js";
import { fetchData } from "../../../shared/js/apiService.js";

let loadedTestType = null;

document.addEventListener("DOMContentLoaded", async function () {
  await setupTestSelect();
  setupPortada();
  setupPreguntas();

  const urlParams = new URLSearchParams(window.location.search);
  const testId = urlParams.get("id");

  if (testId) {
    await cargarTestParaEditar(testId);
  }

  document
    .getElementById("updateTest")
    .addEventListener("click", actualizarTest);
});

async function cargarTestParaEditar(testId) {
  try {
    const response = await fetchData(`/Test/ObtenerTest/${testId}`);

    if (!response || !response.success) {
      console.error("❌ Error al obtener el test.");
      return;
    }
    const testData = response.test;

    loadedTestType = testData.testType;
    const selectTest = document.getElementById("selectTest");
    if (selectTest) {
      selectTest.value = testData.testType.value;
      selectTest.disabled = true;
    }

    if (testData.hasInstructions) {
      llenarPortada(testData.instructions);
    }

    llenarPreguntas(testData.elements);
  } catch (error) {
    console.error("❌ Error al cargar el test para edición:", error);
  }
}

async function actualizarTest() {
  const testId = new URLSearchParams(window.location.search).get("id");

  if (!testId) {
    alert("⚠️ No se encontró el ID del test.");
    return;
  }

  const testTypeSelect = document.getElementById("selectTest");

  const testTypeData = loadedTestType || { value: "", label: "" };
  const selectPortada = document.getElementById("selectPortada");
  const tituloPortada = document.getElementById("tituloPortada");
  const quillDescripcion = document.querySelector(
    "#descripcionPortada .ql-editor"
  );
  const quillAlerta = document.querySelector("#alertaPortada .ql-editor");
  const iconoAlerta = document.getElementById("iconoAlerta");
  const textoBoton = document.getElementById("textoBoton");
  const iconoBoton = document.getElementById("iconoBoton");
  const instructionsId = document.getElementById("instructionsId")?.value;

  // if (!testTypeSelect.value) {
  //   alert("⚠️ Debes seleccionar un tipo de Test.");
  //   return;
  // }

  const testData = {
    testType: testTypeData,
    hasInstructions: selectPortada?.value === "si",
    instructions:
      selectPortada?.value === "si"
        ? { 
            id: instructionsId ? Number(instructionsId) : null,
            title: tituloPortada?.value || "",
            description: quillDescripcion?.innerHTML || "",
            alert: quillAlerta?.innerHTML || "",
            alertIcon: iconoAlerta?.value || "",
            buttonText: textoBoton?.value || "",
            buttonIcon: iconoBoton?.value || "",
          }
        : null,
    elements: obtenerPreguntas(),
  };

  console.log("📌 Enviando Test Data para actualizar:", testData);

  try {
    const response = await fetchData(
      `/Test/ActualizarTest/${testId}`,
      "PUT",
      testData
    );
    if (response && response.success) {
      alert("✅ Test actualizado exitosamente.");
      window.location.href = "/Test/";
    } else {
      alert("❌ Ocurrió un error al actualizar el Test.");
    }
  } catch (error) {
    console.error("❌ Error al actualizar el Test:", error);
  }
}
