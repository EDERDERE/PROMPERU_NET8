import { fetchData } from "../../../shared/js/apiService.js";
import { renderCallToAction } from "./render.js";

export async function loadCallToAction() {
  try {
    const data = await fetchData(
      "/ContenidoInteractivo/ListarContenidoInteractivos"
    );

    if (data.success && Array.isArray(data.contenidoInteractivos)) {
      const contenidoInteractivos = data.contenidoInteractivos;

      if (contenidoInteractivos.length > 0) {
        const seccion = contenidoInteractivos[0];

        console.log(seccion, 'seccion')
        renderCallToAction(seccion);
      }
    }
  } catch (error) {
    console.error("Error al cargar los seccion dinamica:", error);
  }
}
