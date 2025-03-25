import { fetchData } from "../../../../shared/js/apiService.js";

export async function saveTestProgress(saveTest) {
  const formData = new FormData();

  formData.append("testModel", JSON.stringify(saveTest));
  try {
    const response = await fetchData(
      "/Test/GuardarProgresoTest",
      "POST",
      formData,
      true
    );

    if (response.success) {
      return response;
    } else {
      console.error("Error al guardar el progreso del test", response);
      return response;
    }
  } catch (error) {
    console.error("Error en el servicio saveTestProgress", error);
    throw error;
  }
}
