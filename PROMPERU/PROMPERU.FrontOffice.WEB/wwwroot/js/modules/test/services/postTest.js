import { fetchJsonData } from "../../../../shared/js/apiService.js";

export async function saveTestProgress(saveTest) {
  try {
    await fetchJsonData("/Test/GuardarProgresoTest", "POST", saveTest);
  } catch (error) {
    console.error("❌ Error al guardar el Test:", error);
  }
}
