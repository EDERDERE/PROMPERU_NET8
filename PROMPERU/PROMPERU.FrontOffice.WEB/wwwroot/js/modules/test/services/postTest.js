import { fetchJsonData } from "../../../../shared/js/apiService.js";

export async function saveTestProgress(saveTest) {
  try {
    return await fetchJsonData("/Test/GuardarProgresoTest", "POST", saveTest);
  } catch (error) {
    console.error("❌ Error al guardar el Test:", error);
    return false;
  }
}
