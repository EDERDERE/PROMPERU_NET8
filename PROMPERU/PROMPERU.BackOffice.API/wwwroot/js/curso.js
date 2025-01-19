$(document).ready(function () {
    console.log('')
    loadListarCursos();
    loadCrearCurso();
    loadEditarCurso();
    loadEliminarCurso(); 
    loadGuardarOrden();
});

function loadListarCursos() {
    $.ajax({
        type: 'GET', // Método GET para obtener los sliders
        url: '/Curso/ListarCursos', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar
            $('#sliderContainer').empty(); 
            $('#tituloContainer').empty();
            if (response.success) {
                // Itera sobre la respuesta y crea las tarjetas dinámicamente         
                    console.log('obtener el tirulo Curso', response.cursos[0]);
                var curso = response.cursos[0];
                    var tituloCard = `
                    <div class="row ">
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="titulo-${curso.curs_ID}" class="form-label fw-semibold">Titulo</label>
                            <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                            data-id="${curso.curs_ID}"
                            data-titulo="${curso.curs_Titulo}"
                            data-nombrebotontitulo="${curso.curs_NombreBotonTitulo}"
                            data-urliconboton="${curso.curs_UrlIconBoton}"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </a>
                        </div>
                        <input type="text" id="titulo-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_Titulo}" disabled>

                    </div>
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="nombreBotonTitulo-${curso.curs_ID}" class="form-label fw-semibold">Nombre del botón</label>                          
                        </div>
                        <input type="text" id="nombreBotonTitulo-${curso.curs_ID}" class="form-control custom-button" placeholder="${curso.curs_NombreBotonTitulo}"
                               disabled>

                    </div>
                </div>

                <div class="row ">

                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="urliconBoton-${curso.curs_ID}" class="form-label fw-semibold">URL ícono de botón</label>                        
                        </div>
                        <input type="text" id="urliconBoton-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_UrlIconBoton}" disabled>

                    </div>
                </div>`;
                    // Agregar el slider al contenedor
                    $('#tituloContainer').append(tituloCard);
              
                response.cursos.forEach((curso) => {
                    if (curso.curs_Orden > 0) {
                        console.log('lista Curso', curso);

                      
                        console.log('Fecha:', curso.curs_FechaInicio, formatearFecha(curso.curs_FechaInicio));

                        /*console.log('fecha', curso.fechaInicio.ToString("dd/MM/yyyy"))*/
                        var sliderCard = `
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
                    <input type="text" id="fechaFin-${curso.curs_ID}" class="form-control" placeholder="${formatearFecha(curso.curs_FechaFin) }" disabled>
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
                        // Agregar el slider al contenedor
                        $('#sliderContainer').append(sliderCard);
                    }
                 
                });
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'No hay banners disponibles',
                    text: response.message || 'No se encontraron banners.',
                });
            }
     

        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar los sliders',
                text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
            });
        }
    });

}
function loadCrearCurso() {
    $('#saveCreateSlider').click(function () {
        var nombreCurso = $('#createCurso').val();    
        var objetivo = $('#createObjetivo').val();
        var description = $('#createDescription').val();
        var fechaInicio = $('#createFechaInicial').val();
        var fechaFin = $('#createFechaFinal').val();
        var modalidad = $('#createModalidad').val();
        var urlImagen = $('#createUrlImagen').val();
        var nombreBoton = $('#createNombreBoton').val();
        var urlIcon = $('#createUrlIconBoton').val();

        if (description && urlIcon && nombreCurso && objetivo && fechaInicio && fechaFin && modalidad && urlImagen && nombreBoton ) {
            $.ajax({
                type: 'POST',
                url: '/Curso/InsertarCurso',  // URL del controlador para crear el slider
                data: {
                    nombreCurso: nombreCurso,
                    objetivo: objetivo,
                    description: description,
                    modalidad: modalidad,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    nombreBoton: nombreBoton,
                    urlIcon: urlIcon,
                    urlImagen: urlImagen
                },
                success: function (response) {

                    console.log('Crear', response)
                    // Manejo de la respuesta
                    if (response.success) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Curso creado exitosamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function () {
                            location.reload(); // Recargar la página o actualizar el contenido
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al crear el Curso',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al intentar crear el Curso',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        } else {
            Swal.fire({
                title: 'Advertencia',
                text: 'Por favor, complete todos los campos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}
function loadEditarCurso() {

    $('#editTitle').on('show.bs.modal', function (event) {
        // Obtener los datos del botón que activó el modal
        var button = $(event.relatedTarget); // El botón que activó el modal
        var id = button.data('id'); // Obtener el ID
        var titulo = button.data('titulo'); // Obtener el ID
        var nombreBotonTitulo = button.data('nombrebotontitulo');   
        var urlIconBoton = button.data('urliconboton');         
       

        // Asignar los valores al modal
        var modal = $(this);
        modal.find('#editId').val(id);
        modal.find('#editTitulo').val(titulo);
        modal.find('#editNombreBotonTitulo').val(nombreBotonTitulo);
        modal.find('#editUrlBoton').val(urlIconBoton);       
        
    });
    $('#saveEditTitulo').click(function () {

        var id = $('#editIdTitulo').val();
        var titulo = $('#editTitulo').val();    
        var nombreBotonTitulo = $('#editNombreBotonTitulo').val();   
        var urlBoton = $('#editUrlBoton').val();   
        console.log('editar modal titulo', id, titulo)
        if (id && titulo && nombreBotonTitulo && urlBoton) {
            $.ajax({
                type: 'POST',
                url: '/Curso/ActualizarCurso',  // URL del controlador para editar el slider
                data: {
                    id: id,
                    titulo: titulo,
                    nombreBotonTitulo: nombreBotonTitulo,
                    urlIconBoton: urlBoton,
                    fechaInicio: null,
                    fechaFin:null
                },
                success: function (response) {
                    console.log('actualzia Curso', response)
                    // Manejo de la respuesta
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Actualizado!',
                            text: 'El Curso se ha actualizado exitosamente.',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            location.reload(); // Recargar la página o actualizar el contenido
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo actualizar el slider. Inténtelo nuevamente.',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al intentar actualizar el Curso.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    $('#editSliderModal').on('show.bs.modal', function (event) {
        // Obtener los datos del botón que activó el modal     
        var button = $(event.relatedTarget); // El botón que activó el modal
        var id = button.data('id'); // Obtener el ID
        var orden = button.data('orden'); // Obtener el ID
        var nombreCurso = button.data('nombrecurso');
        var objetivo = button.data('objetivo');
        var description = button.data('description');
        var fechaInicio = button.data('fechainicio');
        var fechaFin = button.data('fechafin');
        var modalidad = button.data('modalidad');
        var urlImagenn = button.data('urlimagen');
        var nombreBoton = button.data('nombreboton');
        var urlIcon = button.data('urlicon');

        console.log('sass', nombreCurso, nombreBoton)
        // Asignar los valores al modal
        var modal = $(this);
        modal.find('#editId').val(id);
        modal.find('#editOrder').val(orden);
        modal.find('#editNombreCurso').val(nombreCurso);
        modal.find('#editObjetivo').val(objetivo);
        modal.find('#editDescription').val(description);
        modal.find('#editFechaInicio').val(fechaInicio);
        modal.find('#editFechaFin').val(fechaFin);
        modal.find('#editModalidad').val(modalidad);
        modal.find('#editUrlImagen').val(urlImagenn);
        modal.find('#editNombreBoton').val(nombreBoton);
        modal.find('#editUrlIcon').val(urlIcon);  
    });
    $('#saveEditSlider').click(function () {
        console.log('editar modal')
        var id = $('#editId').val();
        var orden = $('#editOrder').val();
        var nombreCurso = $('#editNombreCurso').val();
        var objetivo = $('#editObjetivo').val();
        var description = $('#editDescription').val();
        var fechaInicio = $('#editFechaInicio').val();
        var fechaFin = $('#editFechaFin').val();
        var modalidad = $('#editModalidad').val();
        var urlImagen = $('#editUrlImagen').val();
        var nombreBoton = $('#editNombreBoton').val();
        var urlIcon = $('#editUrlIcon').val();

  
        if (description && urlIcon && nombreCurso && objetivo && fechaInicio && fechaFin && modalidad && urlIcon && urlImagen && nombreBoton) {
            $.ajax({
                type: 'POST',
                url: '/Curso/ActualizarCurso',  // URL del controlador para editar el slider
                data: {
                    id: id,
                    orden: orden,
                    nombreCurso: nombreCurso,
                    objetivo: objetivo,
                    description: description,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    modalidad: modalidad,
                    urlImagen: urlImagen,
                    nombreBoton: nombreBoton,
                    urlIcon: urlIcon
                },
                success: function (response) {
                    console.log('actualzia Curso',response)
                    // Manejo de la respuesta
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Actualizado!',
                            text: 'El Curso se ha actualizado exitosamente.',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            location.reload(); // Recargar la página o actualizar el contenido
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo actualizar el slider. Inténtelo nuevamente.',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al intentar actualizar el Curso.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}
function loadEliminarCurso() {
    $(document).on('click', '[id^="btn-delete-"]', function () {
        var id = $(this).data('id'); // Obtener el ID del elemento a eliminar
        console.log(`ID a eliminar: ${id}`);
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la solicitud AJAX para eliminar el elemento
                $.ajax({
                    type: 'POST',
                    url: '/Curso/EliminarCurso', // Ruta del controlador para la eliminación
                    data: { id: id },
                    success: function (response) {
                        if (response.success) {
                            Swal.fire(
                                '¡Eliminado!',
                                'El elemento ha sido eliminado con éxito.',
                                'success'
                            ).then(() => {
                                location.reload(); // Recargar la página o actualizar el contenido dinámicamente
                            });
                        } else {
                            Swal.fire(
                                'Error',
                                'No se pudo eliminar el elemento. Inténtalo de nuevo.',
                                'error'
                            );
                        }
                    },
                    error: function () {
                        Swal.fire(
                            'Error',
                            'Hubo un error en el servidor al intentar eliminar el elemento.',
                            'error'
                        );
                    }
                });
            }
        });
    });  
}
function loadGuardarOrden() {


    // Al hacer clic en el botón de guardar cambios
    $('#saveOrder').click(function () {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ordenar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                console.log('guardar order')
                // Capturar el data-id del card correspondiente

                var Ids = [];
                var Orders = [];
                var NombreCursos = [];
                var Objetivos = [];
                var Descriptions = [];
                var FechaInicios = [];
                var FechaFinales = [];
                var Modalidades = [];
                var UrlImagenes = [];
                var NombreBotones = [];
                var UrlIcons = [];
                var NewOrders = [];

                // Iterar sobre cada card y capturar su data-id
                $('.btn-link.text-primary').each(function () {
                    var id = $(this).data('id');
                    Ids.push(id);

                    var order = $(this).data('orden');
                    Orders.push(order);

                    var nombreCurso = $(this).data('nombrecurso');
                    NombreCursos.push(nombreCurso);

                    var objetivo = $(this).data('objetivo');
                    Objetivos.push(objetivo);

                    var description = $(this).data('description');
                    Descriptions.push(description);

                    var fechaInicio = $(this).data('fechainicio');
                    FechaInicios.push(fechaInicio);

                    var fechaFin = $(this).data('fechafin');
                    FechaFinales.push(fechaFin);

                    var modalidad = $(this).data('modalidad');
                    Modalidades.push(modalidad);

                    var urlImagen = $(this).data('urlimagen');
                    UrlImagenes.push(urlImagen);

                    var nombreBotones = $(this).data('nombreboton');
                    NombreBotones.push(nombreBotones);

                    var UrlIcon = $(this).data('urlicon');
                    UrlIcons.push(UrlIcon);


                });

                $('.card').each(function () {
                    var NewOrder = $(this).find('.card-number').text().trim();
                    NewOrders.push(NewOrder);
                });

                // Mostrar los data-id capturados en la consola (o hacer lo que necesites con ellos)
                console.log(Ids, NewOrders, UrlIcons, NombreBotones, UrlImagenes);
                // Aquí podrías realizar otras acciones con el data-id, como enviar una petición al servidor.


                var result = [];

                Ids.forEach((id, index) => {
                    result.push({
                        id: parseInt(id),                 // Coincide con BannerDto.Id
                        orden: parseInt(NewOrders[index]),// Coincide con BannerDto.Orden                        
                        nombreCurso: NombreCursos[index].toString(),
                        objetivo: Objetivos[index].toString(),
                        description: Descriptions[index].toString(), // Coincide con BannerDto.Description
                        modalidad: Modalidades[index].toString(),  // Coincide con BannerDto.ImageUrl                      
                        fechaInicio: FechaInicios[index].toString(),  // Coincide con BannerDto.ImageUrl
                        fechaFin: FechaFinales[index].toString(),  // Coincide con BannerDto.ImageUrl
                        nombreBoton: NombreBotones[index].toString(), // Coincide con BannerDto.ImageUrl                  
                        UrlIcon: UrlIcons[index].toString(),  // Coincide con BannerDto.ImageUrl
                        UrlImagen: UrlImagenes[index].toString(),
                    });
                });

                // Mostrar el resultado en la consola
                console.log(result);
                console.log(JSON.stringify(result));
                
                $.ajax({
                    url: '/Curso/ActualizarOrdenCurso',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8', // Cabecera correcta
                    data: JSON.stringify(result),
                    success: function (response) {
                        // Manejo de la respuesta
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Actualizado!',
                                text: 'El Curso se ha actualizado exitosamente.',
                                confirmButtonText: 'Aceptar'
                            }).then(() => {
                                location.reload(); // Recargar la página o actualizar el contenido
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se pudo actualizar el Curso. Inténtelo nuevamente.',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un error al intentar actualizar el slider.',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });

               
            }
        });
     
    });
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