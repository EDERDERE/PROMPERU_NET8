import { fetchData } from "../../../../shared/js/apiService.js";
import { store } from "../state.js";

export async function preloadInscriptions() {
  try {
    const data = await fetchData("/Inscripcion/ListarInscripcions");
    if (data?.inscripcions) {
      store.setState({ inscriptions: data.inscripcions });
    }
  } catch (error) {
    console.error("Error al precargar inscripciones", error);
  }
}
