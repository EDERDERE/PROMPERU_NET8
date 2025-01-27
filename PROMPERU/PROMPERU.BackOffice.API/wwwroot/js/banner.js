$(document).ready(function () {
    loadListarBanner();
    loadCrearBanner();
    loadEditarBanner();
    loadEliminarBanner(); 
    loadGuardarOrden();

});

function loadListarBanner() {
    $.ajax({
        type: 'GET', // Método GET para obtener los sliders
        url: '/Banner/ListarBanners', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar
            $('#sliderContainer').empty();
            if (response.success) {
                // Itera sobre la respuesta y crea las tarjetas dinámicamente
                response.banners.forEach((banner) => {

                    console.log('lista banner', banner);
                    var sliderCard = `
                    <div class="card col-12 col-md-12 shadow-lg border-0 p-4 mb-3" data-id="${banner.bann_ID}" data-orden="${banner.bann_Orden}">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-number mb-0">${banner.bann_Orden}</h5>
                <div class="d-flex gap-2">
                  <button class="btn btn-link text-danger p-0" 
                    id="btn-delete-${banner.bann_ID}"
                        data-id=${banner.bann_ID} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                  <button class="btn btn-link text-primary p-0" data-bs-toggle="modal" data-bs-target="#editSliderModal"
                  data-id="${banner.bann_ID}"
                  data-orden="${banner.bann_Orden}"
                  data-description="${banner.bann_Nombre}"
                  data-image-url="${banner.bann_URLImagen}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                  <div class="sortable-handle d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="description-${banner.bann_ID}" class="form-label fw-semibold">Descripción</label>
                <textarea id="description-${banner.bann_ID}" class="form-control" rows="3" placeholder="${banner.bann_Nombre}" disabled></textarea>
              </div>
              <div>
                <label for="image-url-${banner.bann_ID}" class="form-label fw-semibold">URL de la imagen</label>
                <input type="text" id="image-url-${banner.bann_ID}" class="form-control" value="${banner.bann_URLImagen}" disabled>
              </div>
            </div>`;
                    // Agregar el slider al contenedor
                    $('#sliderContainer').append(sliderCard);
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
function loadCrearBanner() {
    $('#saveCreateSlider').click(function () {
        var description = $('#createDescription').val();
        var imageUrl = $('#createImageUrl').val();

        if (description && imageUrl) {
            $.ajax({
                type: 'POST',
                url: '/Banner/InsertarBanner',  // URL del controlador para crear el slider
                data: {
                    description: description,
                    imageUrl: imageUrl
                },
                success: function (response) {

                    console.log('Crear', response)
                    // Manejo de la respuesta
                    if (response.success) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Slider creado exitosamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function () {
                            location.reload(); // Recargar la página o actualizar el contenido
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al crear el slider',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al intentar crear el slider',
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
function loadEditarBanner() {
    $('#editSliderModal').on('show.bs.modal', function (event) {
        // Obtener los datos del botón que activó el modal
        var button = $(event.relatedTarget); // El botón que activó el modal
        var id = button.data('id'); // Obtener el ID
        var order = button.data('orden'); 
        var description = button.data('description'); // Obtener la descripción
        var imageUrl = button.data('image-url'); // Obtener la URL de la imagen

        // Asignar los valores al modal
        var modal = $(this);
        modal.find('#editId').val(id);
        modal.find('#editOrder').val(order);
        modal.find('#editDescription').val(description); // Llenar el textarea con la descripción
        modal.find('#editImageUrl').val(imageUrl); // Llenar el campo de la URL de la imagen
    });
    $('#saveEditSlider').click(function () {
        console.log('editar modal')
        var description = $('#editDescription').val();
        var imageUrl = $('#editImageUrl').val();
        var orden = $('#editOrder').val();
        var id = $('#editId').val();

        if (description && imageUrl) {
            $.ajax({
                type: 'POST',
                url: '/Banner/ActualizarBanner',  // URL del controlador para editar el slider
                data: {
                    id: id,
                    orden: orden,
                    description: description,
                    imageUrl: imageUrl
                },
                success: function (response) {
                    console.log('actualzia banner',response)
                    // Manejo de la respuesta
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Actualizado!',
                            text: 'El slider se ha actualizado exitosamente.',
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
                        text: 'Hubo un error al intentar actualizar el slider.',
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
function loadEliminarBanner() {
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
                    url: '/Banner/EliminarBanner', // Ruta del controlador para la eliminación
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
                var Descriptions = [];
                var Urls = [];
                var NewOrders = [];

                // Iterar sobre cada card y capturar su data-id
                $('.btn-link.text-primary').each(function () {
                    var Id = $(this).data('id');
                    Ids.push(Id);

                    var Order = $(this).data('orden');
                    Orders.push(Order);

                    var Description = $(this).data('description');
                    Descriptions.push(Description);

                    var Url = $(this).data('image-url');
                    Urls.push(Url);


                });

                $('.card').each(function () {
                    var NewOrder = $(this).find('.card-number').text().trim();
                    NewOrders.push(NewOrder);
                });

                // Mostrar los data-id capturados en la consola (o hacer lo que necesites con ellos)
                console.log(Ids, NewOrders);
                // Aquí podrías realizar otras acciones con el data-id, como enviar una petición al servidor.


                var result = [];

                Ids.forEach((id, index) => {
                    result.push({
                        id: parseInt(id),                 // Coincide con BannerDto.Id
                        orden: parseInt(NewOrders[index]), // Coincide con BannerDto.Orden
                        description: Descriptions[index].toString(), // Coincide con BannerDto.Description
                        imageUrl: Urls[index].toString()  // Coincide con BannerDto.ImageUrl
                    });
                });

                // Mostrar el resultado en la consola
                console.log(result);
                console.log(JSON.stringify(result));
                
                $.ajax({
                    url: '/Banner/ActualizarOrdenBanner',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8', // Cabecera correcta
                    data: JSON.stringify(result),
                    success: function (response) {
                        // Manejo de la respuesta
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Actualizado!',
                                text: 'El Banner se ha actualizado exitosamente.',
                                confirmButtonText: 'Aceptar'
                            }).then(() => {
                                location.reload(); // Recargar la página o actualizar el contenido
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se pudo actualizar el Banner. Inténtelo nuevamente.',
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