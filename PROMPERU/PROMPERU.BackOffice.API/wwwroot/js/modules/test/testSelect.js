import { fetchData } from "../../../shared/js/apiService.js";

export async function setupTestSelect() {
  const selectTest = document.getElementById("selectTest");

  if (!selectTest) {
    console.error("❌ No se encontró el elemento #selectTest en el DOM.");
    return;
  }

  const response = await fetchData("/Test/ListarMaestros");

  if (!response || !response.success) {
    console.error("❌ Error al obtener los tipos de test.");
    return;
  }

  const testTypes = response.resuls.testTypes || [];


  selectTest.innerHTML = `<option value="" selected disabled>Selecciona un tipo de Test</option>`;

  testTypes.forEach((test) => {
    const option = document.createElement("option");
    option.value = test.value;
    option.textContent = test.label;
    selectTest.appendChild(option);
  });

  console.log("✅ Tipos de test cargados exitosamente.");
}
