import { fetchData } from "../../../shared/js/apiService.js";
import {
    loadCalendar,
    initCalendarViews,
    renderEventCards,
    renderBannerCalendario,
} from "./render.js";

export async function loadCalendario() {
    try {
        const response = await fetchData("/Calendario/ListarCursos");
        console.log(response);
        if (response.success) {
            const cursos = response.cursos;
            if (cursos.length > 0) {
                initCalendarViews();

                const dates = cursos
                    .map((curso) => {
                        const modalidades = curso.tipoModalidadList.filter(
                            (modalidad) => modalidad.fechaInicio && modalidad.fechaFin,
                        );
                        modalidades.forEach((modalidad) => {
                            const inicio = dayjs(modalidad.fechaInicio);
                            const fin = dayjs(modalidad.fechaFin);

                            if (inicio !== fin) {
                                // utiliza dayjs para crear nuevos eventos en el rango de fehcas, es decir, si el unicio es 16 de enero y fin 18 de enero, se crearan 3 eventos, uno para cada dia y reemplaza el evento original
                                const diff = fin.diff(inicio, "days");
                                for (let i = 1; i <= diff; i++) {
                                    const fecha = inicio.add(i, "days").format("YYYY-MM-DD");
                                    console.log(fecha);
                                    modalidades.push({
                                        fechaInicio: fecha,
                                        fechaFin: fecha,
                                        tmod_Nombre: modalidad.tmod_Nombre,
                                    });
                                }
                                modalidad.fechaFin = inicio.format("YYYY-MM-DD");
                            }
                        });
                        return modalidades.map((modalidad) => {
                            return {
                                start: modalidad.fechaInicio.split("T")[0],
                                end: modalidad.fechaFin.split("T")[0],
                                descripcion: curso.curs_Descripcion,
                                tipo: curso.curs_Evento,
                                title: curso.curs_NombreCurso + " - " + modalidad.tmod_Nombre,
                                modalidad: modalidad.tmod_Nombre,
                                backgroundColor:
                                    curso.curs_Evento === "Curso" ? "#C41321" : "#E7E7E8",
                                borderColor:
                                    curso.curs_Evento === "Curso" ? "#C41321" : "#E7E7E8",
                                textColor: curso.curs_Evento === "Curso" ? "#fff" : "#000",
                            };
                        });
                    })
                    .flat();

                loadCalendar([...dates]);
                renderEventCards(dates);
                console.log(cursos[0]);
                renderBannerCalendario(cursos[0]);
            } else {
                $("#sliderContainer").html(
                    "<p>No se encontraron cursos disponibles.</p>",
                );
            }
        } else {
            showErrorMessage(response.message || "No se encontraron cursos.");
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
