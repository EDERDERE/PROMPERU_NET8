import { fetchData } from "../../../shared/js/apiService.js";
import { renderInscription } from "./render.js";

export async function loadListInscriptions() {
  const data = await fetchData("/Inscripcion/ListarInscripcions");
  if (data?.inscripcions?.length > 0) {
    renderInscription(data.inscripcions);
  }
}

