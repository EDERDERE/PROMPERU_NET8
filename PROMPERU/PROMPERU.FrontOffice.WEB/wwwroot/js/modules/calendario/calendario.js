import { fetchData } from "../../../shared/js/apiService.js";
import {
    loadCalendar,
    initCalendarViews,
    renderEventCards,
    renderBannerCalendario,
    loadYearOptions,
    loadMonthOptions
} from "./render.js";

let tipoEventoSelected = "";
let yearSelected = "";
let monthSelected = "";

let cursos = [];

export async function loadCalendario() {
    try {
        const response = await fetchData("/Calendario/ListarCursos");
        if (response.success) {
            cursos = response.cursos; // updated to use the variable defined at the top
            if (cursos.length > 0) {
                renderBannerCalendario(cursos[0]);
                const events = parseEvents(cursos);
                loadCalendar(events);
                renderEventCards(events);
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

export async function initCalendarView(){
    initCalendarViews();
    loadYearOptions();
    loadMonthOptions();
    await cargarTiposEvento();
    loadFilterEventsListenner();
}

function parseEvents(cursos, filtered = false) {
    const events = JSON.parse(JSON.stringify(cursos))
    .map((curso) => {
        const modalidades = curso.tipoModalidadList.filter(
            (modalidad) => modalidad.fechaInicio && modalidad.fechaFin,
        );
        modalidades.forEach((modalidad) => {
            const inicio = dayjs(modalidad.fechaInicio);
            const fin = dayjs(modalidad.fechaFin);

            if (inicio !== fin) {
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

    if(filtered){
        console.log("Filtrando eventos");
        let filteredEvents = events.filter((curso) => {
            let matchTipoEvento = true;
            let matchYear = true;
            let matchMonth = true;
    
            if(tipoEventoSelected && tipoEventoSelected !== "Seleccione su tipo"){
                matchTipoEvento = curso.tipo === tipoEventoSelected;
            }

            if (yearSelected && yearSelected !== "Seleccione el año") {
                const date = dayjs(curso.start);
                matchYear = date.year() === parseInt(yearSelected);
            }

            if (monthSelected && monthSelected !== "Seleccione el mes") {
                const date = dayjs(curso.start);
                matchMonth = date.month() === parseInt(monthSelected) - 1;
            }
    
            return matchTipoEvento && matchYear && matchMonth;
        });

        return filteredEvents;
    }

    return events;
}

function loadFilterEventsListenner(){
    $("#inputTipoEvento").on("change", function(){
        const selectedValue = $(this).val();
        const selectedOption = $(this).find("option[value='" + selectedValue + "']");
        const selectedOptionText = selectedOption.text();

        tipoEventoSelected = selectedOptionText;
        applyFilters();
    });

    $("#year").on("change", function(){
        yearSelected = $(this).val();
        console.log(yearSelected);
        applyFilters();
    });

    $("#month").on("change", function(){
        monthSelected = $(this).val();
        console.log(monthSelected);
        applyFilters();
    });
}

function applyFilters(){
    const events = parseEvents(cursos, true);
    loadCalendar(events);
    renderEventCards(events);
}