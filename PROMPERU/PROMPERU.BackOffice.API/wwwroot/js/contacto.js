$(document).ready(function () {
  loadListarContacto();
    loadEditarContacto();
    DescargaContacto();
});

function loadListarContacto() {
  $.ajax({
    type: "GET",
    url: "/FormularioContacto/ListarFormularioContactos",
    dataType: "json",
    success: function (response) {
      console.log(response);
      $("#sliderContainer").empty();
      if (response.success) {
        var formularioContacto = response.formularioContactos[0];
        var formulario = `
              <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class=" mb-0">Contáctanos Home </h5>
                    <div class="d-flex gap-2">
                      
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${formularioContacto.fcon_ID}"
                                data-correo="${formularioContacto.fcon_Correo}"
                                data-descripcion="${formularioContacto.fcon_Descripcion}"
                                data-descripcionSubtitulo="${formularioContacto.fcon_DescripcionSubTitulo}"
                                data-direccion="${formularioContacto.fcon_Direccion}"
                                data-horario="${formularioContacto.fcon_Horario}"
                                data-nombreBoton="${formularioContacto.fcon_NombreBoton}"
                                data-nombreBoton2="${formularioContacto.fcon_NombreBotonDos}"
                                data-subtitulo="${formularioContacto.fcon_SubTitulo}"
                                data-subtitulo2="${formularioContacto.fcon_SubTituloDos}"
                                data-telefono="${formularioContacto.fcon_Telefono}"
                                data-titulo="${formularioContacto.fcon_Titulo}"
                                data-tituloSeccion="${formularioContacto.fcon_TituloSeccion}"
                                data-urlIconoBoton="${formularioContacto.fcon_UrlIconBoton}"
                                data-urlIconoBoton2="${formularioContacto.fcon_UrlIconBotonDos}"
                                data-urlImagen="${formularioContacto.fcon_UrlImagen}"
                                data-politicas="${formularioContacto.fcon_UrlPoliticas}"
                              >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </button>

                       
                    </div>
                </div>

                 <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Correo Electronico</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_Correo}" disabled>
              </div>

                <div class="mb-3">
                    <label for="description-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Descripción</label>
                    <textarea id="description-${formularioContacto.fcon_ID}" class="form-control" rows="3" placeholder="${formularioContacto.fcon_Descripcion}"
                              disabled></textarea>
                </div>

              <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Dirección</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_Direccion}" disabled>
              </div>

                <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Horario</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_Horario}" disabled>
              </div>
                <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Nombre del botón</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_NombreBoton}" disabled>
              </div>

              <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Titulo Izquierda</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_SubTitulo}" disabled>
              </div>


                <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Titulo Derecha</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_SubTituloDos}" disabled>
              </div>

              <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Telefono</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_Telefono}" disabled>
              </div>

              <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Titulo Principal</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_Titulo}" disabled>
              </div>

              <hr />

               <h5 class=" mb-3">Contáctanos Seccion </h5>


              <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Descripcion Banner</label>
               
                 <textarea id="description-${formularioContacto.fcon_ID}" class="form-control" rows="3" placeholder="${formularioContacto.fcon_Descripcion}"
                              disabled></textarea>
              </div>

               <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Nombre Boton</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_NombreBotonDos}" disabled>
              </div>

               <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">Titulo</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_TituloSeccion}" disabled>
              </div>

               <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">URL Imagen</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_UrlImagen}" disabled>
              </div>

               <div class="mb-3">
                <label for="icon-url-${formularioContacto.fcon_ID}" class="form-label fw-semibold">URL politicas</label>
                <input type="text"  id="icon-url-${formularioContacto.fcon_ID}" class="form-control" value="${formularioContacto.fcon_UrlPoliticas}" disabled>
              </div>



           `;

        $("#tituloContainer").append(formulario);
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

function loadEditarContacto() {
    const showAlert = (type, title, text, callback) => {
        Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonText: "Aceptar",
        }).then(() => {
            if (callback) callback();
        });
    };
  const assignModalValues = (modal, data) => {
    Object.keys(data).forEach((key) => {
      modal.find(`#${key}`).val(data[key] ?? "");
    });
  };

  const handleAjaxRequest = (url, data, successMessage, errorMessage) => {
    $.ajax({
      type: "POST",
      url: url, 
      data: data,
        success: function (response) {
          console.log('response',response)
        if (response.success) {
          showAlert("success", "¡Éxito!", successMessage, () =>
            location.reload()
          );
        } else {
          showAlert("error", "Error", errorMessage);
        }
      },
      error: function () {
        showAlert("error", "Error", "Hubo un error al procesar la solicitud.");
      },
    });
  };

  $("#editSliderModal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);

    const modalData = {
      editIdContacto: button.data("id"),
        editCorreo: button.data("correo"),
        editDescripccion: button.data("descripcion"),
        editDescripccionSubtitulo: button.data("descripcionsubtitulo"),
      editDireccion: button.data("direccion"),
      editHorario: button.data("horario"),
      editNombreBoton: button.data("nombreboton"),
      editTituloIzquierda: button.data("subtitulo"),
      editTituloDerecha: button.data("subtitulo2"),
      editTelefono: button.data("telefono"),
      editTituloPrincipal: button.data("titulo"),
      editDescripccionBanner: button.data("descripcion"),
      editNombreBotonDos: button.data("nombreboton2"),
      editTituloSeccion: button.data("tituloseccion"),
      editUrlImagen: button.data("urlimagen"),
      editPoliticas: button.data("politicas"),
      editUrlIconoBoton: button.data("urliconoboton"),
      editUrlIconoBotonDos: button.data("urliconoboton2"),
    };

    assignModalValues($(this), modalData);
  });

  $("#saveEditTitulo").click(function () {
    const formularioContactoDto = {
      id: $("#editIdContacto").val(),
      correo: $("#editCorreo").val(),
      descripcion: $("#editDescripccionBanner").val(),
      descripcionSubTitulo: $("#editDescripccion").val(),
      direccion: $("#editDireccion").val(),
      horario: $("#editHorario").val(),
      nombreBoton: $("#editNombreBoton").val(),
      nombreBotonDos: $("#editNombreBotonDos").val(),
      subTitulo: $("#editTituloIzquierda").val(),
      subTituloDos: $("#editTituloDerecha").val(),
      telefono: $("#editTelefono").val(),
      titulo: $("#editTituloPrincipal").val(),
      tituloSeccion: $("#editTituloSeccion").val(),
      urlImagen: $("#editUrlImagen").val(),
      urlPoliticas: $("#editPoliticas").val(),
      urlIconBoton: "data",
      urlIconBotonDos: "data",
    };
    console.log('gd',formularioContactoDto)
    if (
      Object.values(formularioContactoDto).every((value) => value.trim() !== "")
    ) {
      handleAjaxRequest(
        "/FormularioContacto/ActualizarFormularioContacto",
        formularioContactoDto,
        "El formulario de contacto se ha actualizado exitosamente.",
        "No se pudo actualizar el formulario de contacto."
      );
    } else {
      showAlert(
        "warning",
        "Campos incompletos",
        "Por favor, complete todos los campos antes de continuar."
      );
    }
  });
}
function DescargaContacto() {
    $("#btnDescargar").click(function () {
        let tabla = $("#nombreTabla").val();

        if (!tabla) {
            alert("Ingrese el nombre de la tabla.");
            return;
        }

        window.location.href = "/Descarga/DescargarDatos?tabla=" + encodeURIComponent(tabla);
    });
}