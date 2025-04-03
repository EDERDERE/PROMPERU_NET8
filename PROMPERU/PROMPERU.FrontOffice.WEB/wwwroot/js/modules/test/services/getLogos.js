import { fetchData, fetchJsonData } from "../../../../shared/js/apiService.js";
import { renderLogo } from "../../layout/render.js";

export async function preloadLogos() {
  try {
    const data = await fetchData("/Logo/ListarLogos");

    console.log(data)
    if (data?.logos?.length > 0) {
       renderLogo(data.logos[0], false);
     }
  } catch (error) {
    console.error("Error al precargar inscripciones", error);
  }
}
