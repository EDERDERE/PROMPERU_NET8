$(document).ready(function () {
  console.log("Informacion");
  loadListarInformacion();
  //loadCrearInformacion();
  loadEditarInformacion();
  //loadEliminarInformacion();
  //loadGuardarOrden();
});

// Función para generar la tarjeta de información
function sliderCardInfo(informacion) {
  return `
        <div class="card col-12 col-md-12 shadow border-0 p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="mb-0"></h5>
                <div class="d-flex gap-2">
                    <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                        data-bs-target="#editSliderModal"
                        data-id="${informacion.info_ID}"
                        data-titulo="${informacion.info_Titulo}"
                        data-descripcion="${informacion.info_Descripcion}"
                        data-urlPortada="${informacion.info_URLPortada}"
                        data-urlVideo="${informacion.info_URLVideo}"
                        data-tituloSeccion="${informacion.info_TituloSeccion}"
                        data-descripcion-seccion="${informacion.info_DescripcionBanner}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label for="titulo-${informacion.info_ID}" class="form-label fw-semibold">Titulo</label>
                <input type="text" id="titulo-${informacion.info_ID}" class="form-control" placeholder="¿Qué es?" value="${informacion.info_Titulo}" disabled>
            </div>
            <div class="mb-3">
                <label for="createDescription-${informacion.info_ID}" class="form-label fw-semibold">Descripción</label>
                <textarea id="createDescription-${informacion.info_ID}" class="form-control" rows="3" placeholder="${informacion.info_Descripcion}" disabled></textarea>
            </div>
            <div>
                <label for="image-urlVideo-${informacion.info_ID}" class="form-label fw-semibold">URL del video</label>
                <input type="text" id="image-urlVideo-${informacion.info_ID}" class="form-control" placeholder="${informacion.info_URLVideo}" disabled>
            </div>
            <hr>
            <h5>Sección</h5>
            <div class="mb-3">
                <label for="info-Titulo-${informacion.info_ID}" class="form-label fw-semibold">Titulo</label>
                <input type="text" id="info-Titulo-${informacion.info_ID}" class="form-control" placeholder="${informacion.info_TituloSeccion}" disabled>
            </div>
            <div class="mb-3">
                <label for="image-urlPortada-${informacion.info_ID}" class="form-label fw-semibold">URL del banner</label>
                <input type="text" id="image-urlPortada-${informacion.info_ID}" class="form-control" placeholder="${informacion.info_URLPortada}" disabled>
            </div>

              <div class="mb-3">
                <label for="createDescription-${informacion.info_ID}" class="form-label fw-semibold">Descripción del banner</label>
                <textarea id="createDescription-${informacion.info_ID}" class="form-control" rows="3" placeholder="${informacion.info_DescripcionBanner}" disabled></textarea>
            </div>
            
        </div>`;
}
// Función para listar la información
async function loadListarInformacion() {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/Informacion/ListarInformacions",
      dataType: "json",
    });

    // Limpiar el contenedor antes de agregar los nuevos elementos
    $("#sliderContainer").empty();

    if (response.success) {
      let sliderCardsHtml = "";

      response.informacions.forEach((informacion) => {
        sliderCardsHtml += sliderCardInfo(informacion);
      });

      // Insertar todo el HTML generado de una vez
      $("#sliderContainer").append(sliderCardsHtml);
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay banners disponibles",
        text: response.message || "No se encontraron banners.",
      });
    }
  } catch (error) {
    console.error("Error al cargar los sliders:", error);
    Swal.fire({
      icon: "error",
      title: "Error al cargar los sliders",
      text: "Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
function loadEditarInformacion() {
  $("#editSliderModal").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal
    var id = button.data("id");
    var titulo = button.data("titulo");
    var descripcion = button.data("descripcion");
    var urlPortada = button.data("urlportada");
    var urlVideo = button.data("urlvideo");
    var tituloSeccion = button.data("tituloseccion");
    var descripcionSeccion = button.data("descripcion-seccion");



    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editTitulo").val(titulo);
    modal.find("#editDescription").val(descripcion);
    modal.find("#editUrlPortada").val(urlPortada);
    modal.find("#editUrlVideo").val(urlVideo);
    modal.find("#editTituloSection").val(tituloSeccion);
    modal.find("#editDescriptionSection").val(descripcionSeccion);
  });

  $("#saveEditSlider").click(function () {


    var id = $("#editId").val();
    var titulo = $("#editTitulo").val();
    var description = $("#editDescription").val();
    var urlPortada = $("#editUrlPortada").val();
    var urlVideo = $("#editUrlVideo").val();
    var tituloSeccion = $("#editTituloSection").val();
    var descripcionSeccion = $("#editDescriptionSection").val();


    if (titulo && description && urlPortada && urlVideo && descripcionSeccion) {
      $.ajax({
        type: "POST",
        url: "/Informacion/ActualizarInformacion", // URL del controlador para editar el slider
        data: {
          id: id,
          titulo: titulo,
          description: description,
          urlPortada: urlPortada,
          urlVideo: urlVideo,
          tituloSeccion: tituloSeccion,
          descriptionBanner: descripcionSeccion
        },
        success: function (response) {

          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text: "El slider se ha actualizado exitosamente.",
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
            text: "Hubo un error al intentar actualizar el slider.",
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
function loadCrearInformacion() {
  $("#saveCreateSlider").click(function () {
    var titulo = $("#titulo").val();
    var description = $("#createDescription").val();
    var urlPortada = $("#image-urlPortada").val();
    var urlVideo = $("#image-urlVideo").val();

    if (description && urlPortada && urlVideo && titulo) {
      $.ajax({
        type: "POST",
        url: "/Informacion/InsertarInformacion", // URL del controlador para crear el slider
        data: {
          titulo: titulo,
          description: description,
          urlPortada: urlPortada,
          urlVideo: urlVideo,
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
function loadEliminarInformacion() {
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
          url: "/Informacion/EliminarInformacion", // Ruta del controlador para la eliminación
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
