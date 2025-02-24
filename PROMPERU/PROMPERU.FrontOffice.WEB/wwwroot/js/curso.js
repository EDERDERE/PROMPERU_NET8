﻿$(document).ready(function () {
    console.log('curso web')
    loadListarCursos();  
    cargarTiposEvento();
});
async function loadListarCursos() {
    try {
        // Realiza la solicitud AJAX de forma asíncrona
        const response = await $.ajax({
            type: 'GET',
            url: '/Curso/ListarCursos',
            dataType: 'json',
        });

        // Limpia los contenedores antes de renderizar nuevos datos
        clearContainers();

        // Verifica si la respuesta es exitosa
        if (response.success) {
            const cursos = response.cursos;
            if (cursos.length > 0) {
                renderBannerCurso(cursos[0]);
                renderTituloCurso(cursos[0]);
                renderSliderCurso(cursos);
            } else {
                $('#sliderContainer').html('<p>No se encontraron cursos disponibles.</p>');
            }
        } else {
            showErrorMessage(response.message || 'No se encontraron cursos.');
        }

    } catch (error) {
        // Maneja errores de red o fallos inesperados
        showErrorMessage('Hubo un problema al cargar los cursos. Por favor, inténtelo nuevamente más tarde.');
    }
}
// Función para limpiar los contenedores
function clearContainers() {
    $('#banner').empty();
    $('#tituloCurso').empty();
    $('#sliderCurso').empty();
}
// Función para mostrar mensajes de error con Swal
function renderBannerCurso(curs) {
    const banner = `
      <div class="title">${curs.curs_Titulo}</div>
            <p class="description">${curs.curs_Descripcion}</p>
            <div class="location-return align-items-center">
            <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;
            <a href="#!" title="Calendario"> &nbsp; / Curso</a>
        </div>
      `;
    $('#banner').append(banner);
    cambiarImagenDinamica(curs.curs_UrlImagen);
}
function renderTituloCurso(curs) {

    const tituloCurso = `
      <h2 class="section_title">${curs.curs_TituloSeccion}</h2>
      <div class="red-linear"></div>
      `;
    $('#banner').append(tituloCurso);    
    $('#tituloCurso').append(tituloCurso);
}
function renderSliderCurso(cursos) {
    let slidersHTML = '';

    cursos.forEach(curs => {
        if (curs.curs_Orden > 0) {
            slidersHTML +=
                `
                 <div class="card rounded-4 overflow-hidden border-0 shadow-md">
                    <img src="${curs.curs_UrlImagen}" alt="">
                    <div class="content p-3">
                        <h4>${curs.curs_NombreCurso}</h4>
                        <p class="curso_description">${curs.curs_Descripcion}</p>
                        ${loadModality(curs.tipoModalidadList)}
                        <div class="d-flex justify-content-center">
                            <a href="${curs.curs_LinkBoton}" class="button_brochure"  target="_blank">
                                 ${curs.curs_NombreBoton}
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                                    <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
              
                              `;
        }
    });

    $('#sliderCurso').append(slidersHTML);
}

function formatDates(startDate, endDate){
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    
    if(start.month() === end.month()){
        return `del ${start.date()} al ${end.date()} de ${start.format('MMMM')} del ${end.year()}`;
    } else {
        return `del ${start.date()} de ${start.format('MMMM')} al ${end.date()} de ${end.format('MMMM')} del ${end.year()}`;
    }
}

function loadModality(modalities) {
    let modalityHTML = '';
    const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#C3122C" class="bi bi-calendar4-week" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
            </svg>`;
    const clockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#C3122C" class="bi bi-clock-history" viewBox="0 0 16 16">
    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
</svg>`;
    modalities.reverse().forEach(modality => {

        modalityHTML += `
        <p class="d-flex align-items-center gap-2 ">
            ${modality.tmod_ID === 1 ? clockIcon : calendarIcon}
            <strong>${modality.tmod_Nombre}:</strong>
            <span>${modality.fechaInicio ? formatDates(modality.fechaInicio, modality.fechaFin) : 'En cualquier momento'}</span>
        </p>`

    });

    return modalityHTML;
}