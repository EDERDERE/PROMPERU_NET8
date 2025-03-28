import { fetchData } from "../../../../shared/js/apiService.js";
import { store } from "../state.js";

export async function fetchCompanyData(ruc) {

  const formData = new FormData()
  formData.append("ruc", ruc)

  try {
    const response = await fetchData(
      "/Test/ConsultarRUC",
      "POST",
      formData,
      true
    );

    if (!response) {
      console.error("No se obtuvo respuesta del servidor.");
      return null;
    }

    if (response.success) {
      store.setState({ test: response.test });
      return response.test.companyData;
    } else {
      console.error("Error en la respuesta:", response.message);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
