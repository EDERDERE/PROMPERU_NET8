import { fetchData } from "../../../shared/js/apiService.js";
import { renderBannerContacto, renderTituloSeccionContacto, renderPoliticaContacto, renderBotonContacto, renderDescripcionContacto, renderDataContacto } from "./render.js";

export async function loadContacto() {
  try {
    const data = await fetchData("/FormularioContacto/ListarFormularioContactos");
    if (data.success && Array.isArray(data.formularioContactos)) {
      const formularioContactos = data.formularioContactos;

      if (formularioContactos.length > 0) {
          const contacto = formularioContactos[0];

          renderBannerContacto(contacto);
          renderTituloSeccionContacto(contacto);
          renderPoliticaContacto(contacto);
          renderBotonContacto(contacto);
          renderDescripcionContacto(contacto);
          renderDataContacto(contacto);
      } else {
          $("#bannerHome").html("<p>No se encontraron formularios de contacto disponibles.</p>");
      }
  } else {
      Swal.fire({
          icon: "error",
          title: "No hay formularios disponibles",
          text: response.message || "No se encontraron formularios.",
      });
  }
  } catch (error) {
    console.error("Error al cargar los formularios de contacto:", error);

        Swal.fire({
            icon: "error",
            title: "Error al cargar los formularios",
            text: "Hubo un problema al cargar los formularios de contacto. Inténtelo más tarde.",
        });
  }
}