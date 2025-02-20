import { fetchData } from "../../../shared/js/apiService.js";
import { renderContacto } from "./render.js";

export async function loadContacto() {
  try {
    const data = await fetchData(
      "/FormularioContacto/ListarFormularioContactos"
    );
    if (data.success && Array.isArray(data.formularioContactos)) {
      const formularioContactos = data.formularioContactos;

      if (formularioContactos.length > 0) {
        const contacto = formularioContactos[0];

        renderContacto(contacto);
      }
    }
  } catch (error) {
    console.error("Error al cargar los formularios de contacto:", error);
  }
}
