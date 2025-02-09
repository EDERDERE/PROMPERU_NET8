$(document).ready(function () {
  loadListarEmpresarial();
  loadCrearPerfilEmpresarial();
  loadEditarTestimonio();
  loadEliminarTestimonio();
});

function loadListarEmpresarial() {
  $.ajax({
    type: "GET", // Método GET para obtener los sliders
    url: "/PerfilEmpresarial/ListarPerfilEmpresarials", // URL del controlador que devuelve la lista de sliders
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Limpia el contenedor de sliders antes de renderizar
      $("#sliderContainer").empty();
      if (response.success) {
        // Itera sobre la respuesta y crea las tarjetas dinámicamente
        console.log(
          "obtener el tirulo Requisito",
          response.perfilEmpresarials[0]
        );
        var requisito = response.perfilEmpresarials[0];
        var tituloCard = `
                 <div class="col-md-6">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.pemp_ID}" class="form-label fw-semibold">Titulo</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                        data-id="${requisito.pemp_ID}"
                        data-titulo="${requisito.pemp_Nombre}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                    <input type="text" id="titulo-${requisito.pemp_ID}" class="form-control" placeholder="${requisito.pemp_Nombre}" disabled>
                </div>
                 

            
                    `;
        // Agregar el slider al contenedor
        $("#tituloContainer").append(tituloCard);

        response.perfilEmpresarials.forEach((empresarial) => {
          console.log("lista Requisito", empresarial);
          if (empresarial.pemp_ID >= 2) {
            var sliderCard = `
              <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0"></h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0"
                        data-id="${empresarial.pemp_ID}"  
                        id="btn-delete-${empresarial.pemp_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${empresarial.pemp_ID}"
                            data-description="${empresarial.pemp_Descripcion}"
                              data-urlImagen="${empresarial.pemp_UrlImagen}"
                              >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </button>

                       
                    </div>
                </div>

               
                <div class="mb-3">
                    <label for="description-${empresarial.pemp_ID}" class="form-label fw-semibold">Descripción</label>
                    <textarea id="description-${empresarial.pemp_ID}" class="form-control" rows="3" placeholder="${empresarial.pemp_Descripcion}"
                              disabled></textarea>
                </div>

              <div class="mb-3">
                <label for="icon-url-${empresarial.pemp_ID}" class="form-label fw-semibold">URL de imagen</label>
                <input type="text"  id="icon-url-${empresarial.pemp_ID}" class="form-control" value="${empresarial.pemp_UrlImagen}" disabled>
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
function loadCrearPerfilEmpresarial() {
  $("#saveCreateSlider").click(function () {
    var description = $("#createDescription").val();
    var imageUrl = $("#createImageUrl").val();

    if (description && imageUrl) {
      $.ajax({
        type: "POST",
        url: "/PerfilEmpresarial/InsertarPerfilEmpresarial",
        data: {
          descripcion: description,
          urlImagen: imageUrl,
        },
        success: function (response) {
          console.log("Crear", response);
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
        url: "/PerfilEmpresarial/ActualizarPerfilEmpresarial",
        data: {
          id: id,
          nombre: titulo,
        },
        success: function (response) {
          console.log("actualzia requisito", response);
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

    console.log(description, "nombre");

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
   
    modal.find("#editDescription").val(description);
    modal.find("#editImageUrl").val(urlImagen);
  });
  $("#saveEditSlider").click(function () {
    var description = $("#editDescription").val();
    var id = $("#editId").val();
    var urlImagen = $("#editImageUrl").val();

    if (description && urlImagen) {
      $.ajax({
        type: "POST",
        url: "/PerfilEmpresarial/ActualizarPerfilEmpresarial",
        data: {
          id: id,
          descripcion: description,
          urlImagen: urlImagen,
        },
        success: function (response) {
          console.log("actualzia requisito", response);
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
    console.log(`ID a eliminar: ${id}`);
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
          url: "/PerfilEmpresarial/EliminarPerfilEmpresarial", // Ruta del controlador para la eliminación
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
