$(document).ready(function () {
  loadListarTestimonio();
  loadCrearTestimonio();
  loadEditarTestimonio();
  loadEliminarTestimonio();
});

function loadListarTestimonio() {
  $.ajax({
    type: "GET",
    url: "/Testimonio/ListarTestimonios",
    dataType: "json",
    success: function (response) {
      $("#sliderContainer").empty();
      if (response.success) {
        var requisito = response.testimonios[0];
        var tituloCard = `
                 <div class="col-md-6">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.test_ID}" class="form-label fw-semibold">Titulo</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                        data-id="${requisito.test_ID}"
                        data-titulo="${requisito.test_Nombre}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                    <input type="text" id="titulo-${requisito.test_ID}" class="form-control" placeholder="${requisito.test_Nombre}" disabled>
                </div>
                 

            
                    `;
        // Agregar el slider al contenedor
        $("#tituloContainer").append(tituloCard);

        response.testimonios.forEach((testimonio) => {
          if (testimonio.test_ID >= 2) {
            var sliderCard = `
              <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0"></h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0"
                        data-id="${testimonio.test_ID}"  
                        id="btn-delete-${testimonio.test_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${testimonio.test_ID}"
                            data-description="${testimonio.test_Descripcion}"
                              data-urlImagen="${testimonio.test_UrlImagen}"
                              data-icono="${testimonio.test_UrlIcon}"
                               data-nombre="${testimonio.test_Nombre}"
                                data-empresa="${testimonio.test_NombreEmpresa}"
                              >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </button>

                       
                    </div>
                </div>
                  <div class="mb-3">
                <label for="icon-url-${testimonio.test_ID}" class="form-label fw-semibold">Nombre</label>
                <input type="text"  id="icon-url-${testimonio.test_ID}" class="form-control" value="${testimonio.test_Nombre}" disabled>
              </div>
                <div class="mb-3">
                <label for="icon-url-${testimonio.test_ID}" class="form-label fw-semibold">Nombre Empresa</label>
                <input type="text"  id="icon-url-${testimonio.test_ID}" class="form-control" value="${testimonio.test_NombreEmpresa}" disabled>
              </div>
              
                <div class="mb-3">
                    <label for="description-${testimonio.test_ID}" class="form-label fw-semibold">Descripción</label>
                    <textarea id="description-${testimonio.test_ID}" class="form-control" rows="3" placeholder="${testimonio.test_Descripcion}"
                              disabled></textarea>
                </div>

              <div class="mb-3">
                <label for="icon-url-${testimonio.test_ID}" class="form-label fw-semibold">URL de imagen</label>
                <input type="text"  id="icon-url-${testimonio.test_ID}" class="form-control" value="${testimonio.test_UrlImagen}" disabled>
              </div>
                <div class="mb-3">
                <label for="icon-url-${testimonio.test_ID}" class="form-label fw-semibold">URL del Icono</label>
                <input type="text"  id="icon-url-${testimonio.test_ID}" class="form-control" value="${testimonio.test_UrlIcon}" disabled>
              </div>
            </div>`;
          }
          // Agregar el slider al contenedor
          $("#sliderContainer").append(sliderCard);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No hay banners disponibles",
          text: response.message || "No se encontraron banners.",
        });
      }
    },
    error: function () {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los sliders",
        text: "Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.",
      });
    },
  });
}
function loadCrearTestimonio() {
  $("#saveCreateSlider").click(function () {
    var description = $("#createDescription").val();
    var imageUrl = $("#createImageUrl").val();
    var urlIcon = $("#createIcon").val();
      var nombre = $("#createNombre").val();
      var empresa = $("#createEmpresa").val();
    if (description && imageUrl && urlIcon) {
      $.ajax({
        type: "POST",
        url: "/Testimonio/InsertarTestimonio",
        data: {
          descripcion: description,
          urlImagen: imageUrl,
            urlIcon: urlIcon,
            nombre: nombre,
          empresa:empresa
        },
        success: function (response) {
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              title: "¡Éxito!",
              text: "Slider creado exitosamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(function () {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al crear el slider",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al intentar crear el slider",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } else {
      Swal.fire({
        title: "Advertencia",
        text: "Por favor, complete todos los campos",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  });
}
function loadEditarTestimonio() {
  $("#editTitle").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal
    var id = button.data("id"); // Obtener el ID
    var titulo = button.data("titulo");


    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editIdTitulo").val(id);
    modal.find("#editTitulo").val(titulo);
  });
  $("#saveEditTitulo").click(function () {
    var id = $("#editIdTitulo").val();
    var titulo = $("#editTitulo").val();

    if (id && titulo) {
      $.ajax({
        type: "POST",
        url: "/Testimonio/ActualizarTestimonio",
        data: {
          id: id,
          nombre: titulo,
        },
        success: function (response) {
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text: "El requisito se ha actualizado exitosamente.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo actualizar el slider. Inténtelo nuevamente.",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al intentar actualizar el requisito.",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de continuar.",
        confirmButtonText: "Aceptar",
      });
    }
  });

  $("#editSliderModal").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal
    var id = button.data("id"); // Obtener el ID
    var description = button.data("description"); // Obtener la descripción
    var urlImagen = button.data("urlimagen");
    var urlIcono = button.data("icono");
      var nombre = button.data("nombre");
      var empresa = button.data("empresa");

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editDescription").val(description);
    modal.find("#editImageUrl").val(urlImagen);
      modal.find("#editIcono").val(urlIcono);
      modal.find("#editNombre").val(nombre);
      modal.find("#editEmpresa").val(empresa);
  });
  $("#saveEditSlider").click(function () {
    var description = $("#editDescription").val();
    var id = $("#editId").val();
    var urlImagen = $("#editImageUrl").val();
    var urlIcono = $("#editIcono").val();
      var nombre = $("#editNombre").val();
      var empresa = $("#editEmpresa").val();
    if (description && urlImagen && urlIcono) {
      $.ajax({
        type: "POST",
        url: "/Testimonio/ActualizarTestimonio",
        data: {
          id: id,
          descripcion: description,
          urlImagen: urlImagen,
            urlIcon: urlIcono,
          nombre:nombre,
          empresa:empresa
        },
        
        success: function (response) {
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text: "El requisito se ha actualizado exitosamente.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo actualizar el slider. Inténtelo nuevamente.",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al intentar actualizar el requisito.",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de continuar.",
        confirmButtonText: "Aceptar",
      });
    }
  });
}
function loadEliminarTestimonio() {
  $(document).on("click", '[id^="btn-delete-"]', function () {
    var id = $(this).data("id"); // Obtener el ID del elemento a eliminar
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar la solicitud AJAX para eliminar el elemento
        $.ajax({
          type: "POST",
          url: "/Testimonio/EliminarTestimonio", // Ruta del controlador para la eliminación
          data: { id: id },
          success: function (response) {
            if (response.success) {
              Swal.fire(
                "¡Eliminado!",
                "El elemento ha sido eliminado con éxito.",
                "success"
              ).then(() => {
                location.reload(); // Recargar la página o actualizar el contenido dinámicamente
              });
            } else {
              Swal.fire(
                "Error",
                "No se pudo eliminar el elemento. Inténtalo de nuevo.",
                "error"
              );
            }
          },
          error: function () {
            Swal.fire(
              "Error",
              "Hubo un error en el servidor al intentar eliminar el elemento.",
              "error"
            );
          },
        });
      }
    });
  });
}
