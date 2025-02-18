import { fetchData } from "../../../../shared/js/apiService.js";
import { renderTypesCompany } from "./renderTypesCompany.js";

export async function loadTypesCompany() {
  try {
    console.info("Cargando tipos de empresa...");

    const response = await fetchData("/Empresa/ListarTipoEmpresas");

    if (response?.tipoEmpresas?.length > 0) {
      renderTypesCompany(response.tipoEmpresas);
    } else {
      console.warn("No hay tipos de empresa disponibles.");
    }
  } catch (error) {
    console.error("Error al cargar los tipos de empresa:", error);
  }
}
