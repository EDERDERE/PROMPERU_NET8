import { fetchData } from "../../../shared/js/apiService.js";
import {
  renderBannerCurso,
  renderTituloCurso,
  renderSliderCurso,
  renderSliderCursoHome,
  renderBotonCursoHome
} from "./render.js";

export async function loadCurso() {
  try {
    const data = await fetchData("/Curso/ListarCursos");

    if (data.success && Array.isArray(data.cursos)) {
      const cursos = data.cursos;

      if (cursos.length > 0) {
        const isHome =
          window.location.pathname === "/" ||
          window.location.pathname.includes("Home");

        if (isHome) {
          renderTituloCurso(cursos[0], true);
          renderSliderCursoHome(cursos);
          renderBotonCursoHome(cursos[0])
        } else {
          renderBannerCurso(cursos[0]);
          renderTituloCurso(cursos[0]);
          renderSliderCurso(cursos);
        }
      }
    }
  } catch (error) {
    console.error("Error al cargar los cursos:", error);
  }
}
