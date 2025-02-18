import { fetchData } from "../../../../shared/js/apiService.js";
import { renderRegions } from "./renderRegions.js";


export async function loadRegions() {
  try {
    console.info("Cargando regiones...");

    const response = await fetchData("/Empresa/ListarRegiones");

    if (response?.regions?.length > 0) {
      renderRegions(response.regions);
    } else {
      console.warn("No hay regiones disponibles.");
    }
  } catch (error) {
    console.error("Error al cargar regiones:", error);
  }
}
