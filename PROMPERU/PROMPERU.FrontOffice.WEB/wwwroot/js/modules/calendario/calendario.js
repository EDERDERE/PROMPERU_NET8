import { fetchData } from "../../../shared/js/apiService.js";
import { loadCalendar, initCalendarViews, renderEventCards, renderBannerCalendario } from "./render.js";

export async function loadCalendario() {
  try {
    const response = await fetchData("/Calendario/ListarCursos");
    console.log(response)
      if (response.success) {
          const cursos = response.cursos;
          if (cursos.length > 0) {
              initCalendarViews()

              const dates = cursos.map((curso) => {
                  return curso.tipoModalidadList.filter(modalidad => modalidad.fechaInicio && modalidad.fechaFin).map(modalidad => {
                          return {
                              start: modalidad.fechaInicio.split('T')[0],
                              end: modalidad.fechaFin.split('T')[0],
                              descripcion: curso.curs_Descripcion,
                              descripcion2: curso.curs_DescripcionCalendario,
                              tipo: curso.curs_Evento,
                              title: curso.curs_NombreCurso,
                          }
                      })
              }).flat()

              // obtener las fechas de inicio de los cursos como un evento unico, es decir, sin repetir
                const uniqueDates = dates.filter((date, index, self) =>
                    index === self.findIndex((t) => (
                        t.start === date.start
                    ))
                ).map((date) => {
                    return {
                        start: date.start.split('T')[0],
                        end: date.end.split('T')[0],
                        backgroundColor: '#f0f0f0',
                        display: 'background'
                    }
                })

              loadCalendar([...dates]);
              renderEventCards(dates);
              console.log(cursos[0])
              renderBannerCalendario(cursos[0])
          } else {
              $('#sliderContainer').html('<p>No se encontraron cursos disponibles.</p>');
          }
      } else {
          showErrorMessage(response.message || 'No se encontraron cursos.');
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