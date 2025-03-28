import { fetchJsonData } from "../../../../shared/js/apiService.js";

export async function saveTestProgress(saveTest) {
  try {
    const response = await fetchJsonData(
      "/Test/GuardarProgresoTest",
      "POST",
      saveTest
    );
    if (response && response.success) {
      alert("✅ Test creado exitosamente.");
    } else {
      alert("❌ Ocurrió un error al guardar el Test.");
    }
  } catch (error) {
    console.error("❌ Error al guardar el Test:", error);
  }
}
