import { fetchData } from "../../../shared/js/apiService.js";
import { renderBannerCurso, renderTituloCurso, renderSliderCurso } from "./render.js";

export async function loadCurso() {
  try {
    const data = await fetchData(
      "/Curso/ListarCursos"
    );
    if (data.success && Array.isArray(data.cursos)) {
      const cursos = data.cursos;

      if (cursos.length > 0) {
        renderBannerCurso(cursos[0]);
        renderTituloCurso(cursos[0]);
        renderSliderCurso(cursos);
      }
    }
  } catch (error) {
    console.error("Error al cargar los formularios de contacto:", error);
  }
}
