import { fetchData } from "../../../../shared/js/apiService.js";

export async function fetchCompanyData(ruc) {
  try {
    const response = await fetchData(
      "/Test/ConsultarRUC",
      "GET",
      { ruc },
      false
    );

    if (!response) {
      console.error("No se obtuvo respuesta del servidor.");
      return null;
    }

    if (response.success) {
      store.setState({ test: response.test });
      return response.test.evaluated;
    } else {
      console.error("Error en la respuesta:", response.message);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
