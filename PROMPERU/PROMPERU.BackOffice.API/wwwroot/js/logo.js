$(document).ready(function () {
  loadListarLogo();
  loadEditarLogo();
});

function loadListarLogo() {
  $.ajax({
    type: "GET",
    url: "/Logo/ListarLogos",
    dataType: "json",
    success: function (response) {
      $("#sliderContainer").empty();
      if (response.success) {
        var logo = response.logos[0];

        var tituloCard = `
                 <div class="col-md-6">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${logo.logo_ID}" class="form-label fw-semibold">Nombre del boton</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                        data-id="${logo.logo_ID}"
                        data-nombreboton="${logo.logo_NombreBoton}"
                        data-urliconboton="${logo.logo_UrlIconBoton}"
                        data-urlpricipal="${logo.logo_UrlPrincipal}"
                        data-urlsecundario="${logo.logo_UrlSecundario}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                    <input type="text" id="titulo-${logo.logo_ID}" class="form-control" placeholder="${logo.logo_NombreBoton}" disabled>

                    
                </div>

                 <div class="col-md-6 mb-3">
                      <label for="image-url-${logo.logo_ID}" class="form-label fw-semibold">URL icono del boton</label>
                      <input type="text" id="image-url-${logo.logo_ID}" class="form-control" value="${logo.logo_UrlIconBoton}" disabled>
                  </div>


                  <div class="col-md-6 mb-3">
                      <label for="image-url-${logo.logo_ID}" class="form-label fw-semibold">Logo 1 PromPeru</label>
                      <input type="text" id="image-url-${logo.logo_ID}" class="form-control" value="${logo.logo_UrlPrincipal}" disabled>
                  </div>

                   <div class="col-md-6 mb-3">
                      <label for="image-url-${logo.logo_ID}" class="form-label fw-semibold">Logo 2 Turismo</label>
                      <input type="text" id="image-url-${logo.logo_ID}" class="form-control" value="${logo.logo_UrlSecundario}" disabled>
                  </div>

                    `;
        // Agregar el slider al contenedor
        $("#tituloContainer").append(tituloCard);
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

function loadEditarLogo() {
  $("#editTitle").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var id = button.data("id");
    var nombreboton = button.data("nombreboton");
    var urliconboton = button.data("urliconboton");
    var urlpricipal = button.data("urlpricipal");
    var urlsecundario = button.data("urlsecundario");

    var modal = $(this);
    modal.find("#editIdLogo").val(id);
    modal.find("#editNombreBoton").val(nombreboton);
    modal.find("#editIconoBoton").val(urliconboton);
    modal.find("#editLogo1").val(urlpricipal);
    modal.find("#editLogo2").val(urlsecundario);
  });
  $("#saveEditTitulo").click(function () {
    var id = $("#editIdLogo").val();
    var nombre = $("#editNombreBoton").val();
    var urlIcono = $("#editIconoBoton").val();
    var urlPrincipal = $("#editLogo1").val();
    var urlSecundario = $("#editLogo2").val();

    if (id && nombre) {
      $.ajax({
        type: "POST",
        url: "/Logo/ActualizarLogo",
        data: {
          id: id,
          nombreBoton: nombre,
          urlIconBoton: urlIcono,
          urlPrincipal: urlPrincipal,
          urlSecundario: urlSecundario,
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
            text: "Hubo un error al intentar actualizar el Logo.",
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

