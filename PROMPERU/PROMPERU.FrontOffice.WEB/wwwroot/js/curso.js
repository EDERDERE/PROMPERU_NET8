$(document).ready(function () {
    console.log('curso web')
    loadListarCursos();  
});

function loadListarCursos() {
    $.ajax({
        type: 'GET', // Método GET para obtener los sliders
        url: '/Curso/ListarCursos', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar
            $('#titulo').empty();
            $('#tituloContainer').empty();
            if (response.success) {
                const cursos = response.cursos;
                console.log('cursos',cursos)
                if (cursos.length > 0) {
                    renderTitulo(cursos[0]);
                    renderSliders(cursos);
                } else {
                    $('#sliderContainer').html('<p>No se encontraron cursos disponibles.</p>');
                }

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'No hay cursos disponibles',
                    text: response.message || 'No se encontraron cursos.',
                });
            }


        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar los sliders',
                text: 'Hubo un problema al cargar los cursos. Por favor, inténtelo nuevamente más tarde.',
            });
        }
    });

}

function renderTitulo(curso) {
    const titulo = `
     <h2>${curso.curs_Titulo}</h2>
     <div class="red-linear"></div>
      `;
    $('#titulo').append(titulo);
}

function renderSliders(cursos) {
    let slidersHTML = '';

    cursos.forEach(curso => {
        if (curso.curs_Orden > 0) {
            slidersHTML += 

                `
                               <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${curso.curs_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0" 
                         data-id="${curso.curs_ID}"   
                          id="btn-delete-${curso.curs_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${curso.curs_ID}"     
                                data-orden="${curso.curs_Orden}" 
                            data-nombrecurso="${curso.curs_NombreCurso}"
                            data-objetivo="${curso.curs_Objetivo}"
                            data-description="${curso.curs_Descripcion}"
                            data-fechaInicio="${formatearFechaInversa(curso.curs_FechaInicio)}"
                            data-fechaFin="${formatearFechaInversa(curso.curs_FechaFin)}"
                            data-modalidad="${curso.curs_Modalidad}"
                            data-urlimagen="${curso.curs_UrlImagen}"
                            data-nombreboton="${curso.curs_NombreBoton}"
                            data-urlicon="${curso.curs_UrlIcon}"
                                >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </button>

                        <div class="sortable-handle d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="nombreCurso-${curso.curs_ID}" class="form-label fw-semibold">Curso</label>
                    <input type="text" id="nombreCurso-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_NombreCurso}" disabled>
                </div>

                <div class="mb-3">
                    <label for="objetivo-${curso.curs_ID}" class="form-label fw-semibold">Objetivo del curso</label>
                    <input type="text" id="objetivo-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_Objetivo}"
                           disabled>
                </div>

                <div class="mb-3">
                    <label for="description-${curso.curs_ID}" class="form-label fw-semibold">Logros esperados</label>
                    <textarea id="description-${curso.curs_ID}" class="form-control" rows="3" placeholder="${curso.curs_Descripcion}"
                              disabled></textarea>
                </div>

                   <div class="mb-3">
                    <label for="fechaInicio-${curso.curs_ID}" class="form-label fw-semibold">Fecha Inicio</label>
                    <input type="text" id="fechaInicio-${curso.curs_ID}" class="form-control" value="${formatearFecha(curso.curs_FechaInicio)}" disabled>
                </div>

                <div class="mb-3">
                    <label for="fechaFin-${curso.curs_ID}" class="form-label fw-semibold">Fecha Fin</label>
                    <input type="text" id="fechaFin-${curso.curs_ID}" class="form-control" placeholder="${formatearFecha(curso.curs_FechaFin)}" disabled>
                </div>

              

                <div class="mb-3">
                    <label for="modalidad-${curso.curs_ID}" class="form-label fw-semibold">Modalidad</label>
                    <select class="form-select" id="modalidad-${curso.curs_ID}" disabled>
                        <option value="${curso.curs_ID}">${curso.curs_Modalidad}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="urlImagen-${curso.curs_ID}" class="form-label fw-semibold">URL de la imagen</label>
                    <input type="text" id="urlImagen-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_UrlImagen}" disabled>
                </div>
                <div class="mb-3">
                    <label for="nombreBoton-${curso.curs_ID}" class="form-label fw-semibold">Nombre del botón</label>
                    <input type="text" id="nombreBoton-${curso.curs_ID}" class="form-control custom-button"
                           placeholder="${curso.curs_NombreBoton}" disabled>
                </div>

                <div class="mb-3">
                    <label for="urlIcon-${curso.curs_ID}" class="form-label fw-semibold">URL icono de boton</label>
                    <input type="text" id="urlIcon-${curso.curs_ID}" class="form-control" placeholder="urlIcon-${curso.curs_UrlIcon}" disabled>
                </div>

            </div>
                              `;
        }
    });

    $('#sliderContainer').append(slidersHTML);
}










// Función para formatear la fecha
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Día con dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const anio = fecha.getFullYear(); // Año completo

    return `${dia}/${mes}/${anio}`; // Cambia el formato según sea necesario
}
function formatearFechaInversa(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Día con dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const anio = fecha.getFullYear(); // Año completo

    return `${anio}-${mes}-${dia}`; // Cambia el formato según sea necesario
}