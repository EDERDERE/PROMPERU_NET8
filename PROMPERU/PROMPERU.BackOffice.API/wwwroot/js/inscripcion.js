$(document).ready(function () {
  console.log("Inscripcions");
  loadListarInscripcions();
  loadCrearInscripcion();
  loadEditarInscripcion();
  loadEliminarInscripcion();
  loadGuardarOrden();
});

function loadListarInscripcions() {
  $.ajax({
    type: "GET", // Método GET para obtener los sliders
    url: "/Inscripcion/ListarInscripcions", // URL del controlador que devuelve la lista de sliders
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Limpia el contenedor de sliders antes de renderizar
      $("#sliderContainer").empty();
      if (response.success) {
        // Itera sobre la respuesta y crea las tarjetas dinámicamente
        console.log("obtener el tirulo Inscripcion", response.inscripcions[0]);
        var inscripcion = response.inscripcions[0];
        var tituloCard = `
                        <div class="row ">
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="titulo-${inscripcion.insc_ID}" class="form-label fw-semibold">Titulo</label>
                            <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                            data-id="${inscripcion.insc_ID}"
                            data-titulo="${inscripcion.insc_Titulo}"
                            data-nombreboton="${inscripcion.insc_NombreBoton}"
                              data-contenido="${inscripcion.insc_Contenido}"
                             data-urliconboton="${inscripcion.insc_URLIconBoton}"
                             data-urlimagen="${inscripcion.insc_URLImagen}"
                              data-descripcion-seccion="${inscripcion.insc_Descripcion}"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </a>
                        </div>
                        <input type="text" id="titulo-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_Titulo}" disabled>

                    </div>
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="nombreBoton-${inscripcion.insc_ID}" class="form-label fw-semibold">Nombre del botón</label>                            
                        </div>
                        <input type="text" id="nombreBoton-${inscripcion.insc_ID}" class="form-control custom-button" placeholder="${inscripcion.insc_NombreBoton}" disabled>

                    </div>
                </div>

                <div class="row ">
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="contenido-${inscripcion.insc_ID}" class="form-label fw-semibold">Descripción</label>                           
                        </div>

                        <textarea name="" id="contenido-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_Contenido}" rows="4" disabled></textarea>
                    </div>
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="urlIcon-${inscripcion.insc_ID}" class="form-label fw-semibold">URL ícono de botón</label>                           
                        </div>
                        <input type="text" id="urlIcon-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_URLIconBoton}" disabled>

                    </div>
                    <hr>


              <div class="col-md-6 my-3 ">
                <div class="d-flex justify-content-between">
                  <label for="image-url-1" class="form-label fw-semibold">URL del banner</label>
                  
                </div>
                <input type="text" id="urlimage-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_URLImagen}" disabled>
              </div>

                <div class="col-md-6 my-3 ">
                  <div class="d-flex justify-content-between">
                      <label for="contenido-${inscripcion.insc_ID}" class="form-label fw-semibold">Descripción Sección</label>                           
                  </div>

                  <textarea name="" id="contenido-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_Descripcion}" rows="4" disabled></textarea>
              </div>

                
                  `;
        // Agregar el slider al contenedor
        $("#tituloContainer").append(tituloCard);

        response.inscripcions.forEach((inscripcion) => {
          if (inscripcion.insc_Orden > 0) {
            console.log("lista Inscripcion", inscripcion);

            var sliderCard = `
                           <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${inscripcion.insc_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0" 
                           data-id="${inscripcion.insc_ID}"  
                        id="btn-delete-${inscripcion.insc_ID}"
                              >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${inscripcion.insc_ID}"  
                                data-orden="${inscripcion.insc_Orden}" 
                                data-paso="${inscripcion.insc_Paso}"  
                                data-titulopaso="${inscripcion.insc_TituloPaso}"  
                                data-description="${inscripcion.insc_Descripcion}"  
                                data-urlimagen="${inscripcion.insc_URLImagen}"
                               

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
                    <label for="paso-${inscripcion.insc_ID}" class="form-label fw-semibold">Paso</label>
                    <input type="text" id="paso-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_Paso}" disabled>
                </div>

                <div class="mb-3">
                    <label for="tituloPaso-${inscripcion.insc_ID}" class="form-label fw-semibold">Titulo</label>
                    <input type="text" id="tituloPaso-${inscripcion.insc_ID}" class="form-control" placeholder="${inscripcion.insc_TituloPaso}" disabled>
                </div>

                <div class="mb-3">
                    <label for="description-${inscripcion.insc_ID}" class="form-label fw-semibold">Descripción</label>
                    <textarea id="description-${inscripcion.insc_ID}" class="form-control" rows="3" placeholder="${inscripcion.insc_Descripcion}"
                              disabled></textarea>
                </div>

                <div>
                    <label for="urlImagen-${inscripcion.insc_ID}" class="form-label fw-semibold">URL de la imagen</label>
                    <input type="text" id="iurlImagen-${inscripcion.insc_ID}" class="form-control" placeholder="URL de la imagen" value="${inscripcion.insc_URLImagen}" disabled>
                </div>
            </div>
                            `;
            // Agregar el slider al contenedor
            $("#sliderContainer").append(sliderCard);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No hay inscripcions disponibles",
          text: response.message || "No se encontraron inscripcions.",
        });
      }
    },
    error: function () {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los sliders",
        text: "Hubo un problema al cargar los inscripcions. Por favor, inténtelo nuevamente más tarde.",
      });
    },
  });
}
function loadCrearInscripcion() {
  $("#saveCreateSlider").click(function () {
    var paso = $("#createPaso").val();
    var tituloPaso = $("#createTitulo").val();
    var description = $("#createDescription").val();
    var urlImagen = $("#createUrlImagen").val();

    if (paso && tituloPaso && description && urlImagen) {
      $.ajax({
        type: "POST",
        url: "/Inscripcion/InsertarInscripcion", // URL del controlador para crear el slider
        data: {
          paso: paso,
          tituloPaso: tituloPaso,
          description: description,
          urlImagen: urlImagen,
        },
        success: function (response) {
          console.log("Crear", response);
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              title: "¡Éxito!",
              text: "Inscripcion creado exitosamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(function () {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al crear el inscripcion",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al intentar crear el inscripcion",
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
function loadEditarInscripcion() {
  $("#editTitle").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal

    var id = button.data("id"); // Obtener el ID
    var titulo = button.data("titulo");
    var contenido = button.data("contenido");
    var nombreboton = button.data("nombreboton");
    var urlIconBoton = button.data("urliconboton");
    var urlImageBanner = button.data("urlimagen");
    var descripcionSeccion = button.data("descripcion-seccion");

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editForm").val(id);
    modal.find("#editTitulo").val(titulo);
    modal.find("#editContenido").val(contenido);
    modal.find("#editNombreBoton").val(nombreboton);
    modal.find("#editUrlIcon").val(urlIconBoton);
    modal.find("#editUrlImageBanner").val(urlImageBanner);
    modal.find("#editDescripcionSeccion").val(descripcionSeccion);
  });
  $("#saveEditTitulo").click(function () {
    var idForm = $("#editForm").val();
    var titulo = $("#editTitulo").val();
    var contenido = $("#editContenido").val();
    var nombreBoton = $("#editNombreBoton").val();
    var urlIconBoton = $("#editUrlIcon").val();
    var urlImageBanner = $("#editUrlImageBanner").val();
    var descripcionSeccion = $("#editDescripcionSeccion").val();

    if (
      idForm &&
      titulo &&
      contenido &&
      nombreBoton &&
      urlIconBoton &&
      urlImageBanner &&
      descripcionSeccion
    ) {
      $.ajax({
        type: "POST",
        url: "/Inscripcion/ActualizarInscripcion", // URL del controlador para editar el slider
        data: {
          id: idForm,
          titulo: titulo,
          contenido: contenido,
          nombreBoton: nombreBoton,
          urlIconBoton: urlIconBoton,
          urlImagen: urlImageBanner,
          description: descripcionSeccion,
        },
        success: function (response) {
          console.log("actualzia inscripcion", response);
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text: "El inscripcion se ha actualizado exitosamente.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo actualizar el inscripcion. Inténtelo nuevamente.",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al intentar actualizar el inscripcion.",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } else {
      console.error("dato");
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
    var orden = button.data("orden");
    var paso = button.data("paso");
    var tituloPaso = button.data("titulopaso");
    var description = button.data("description"); // Obtener la descripción
    var urlImagen = button.data("urlimagen"); // Obtener la URL de la imagen

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editOrder").val(orden);
    modal.find("#editTituloPaso").val(tituloPaso);
    modal.find("#editPaso").val(paso);
    modal.find("#editDescription").val(description); // Llenar el textarea con la descripción
    modal.find("#editUrlImagen").val(urlImagen); // Llenar el campo de la URL de la imagen
  });
  $("#saveEditSlider").click(function () {
    console.log("editar modal");
    var tituloPaso = $("#editTituloPaso").val();
    var description = $("#editDescription").val();
    var paso = $("#editPaso").val();
    var orden = $("#editOrder").val();
    var id = $("#editId").val();
    var urlImagen = $("#editId").val();

    if (description && tituloPaso && paso && id) {
      $.ajax({
        type: "POST",
        url: "/Inscripcion/ActualizarInscripcion", // URL del controlador para editar el slider
        data: {
          id: id,
          orden: orden,
          paso: paso,
          tituloPaso: tituloPaso,
          description: description,
          urlImagen: urlImagen,
        },
        success: function (response) {
          console.log("actualzia requisito", response);
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "¡Actualizado!",
              text: "El inscripcion se ha actualizado exitosamente.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo actualizar el inscripcion. Inténtelo nuevamente.",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al intentar actualizar el inscripcion.",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } else {
      console.error("prueba");
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de continuar.",
        confirmButtonText: "Aceptar",
      });
    }
  });
}
function loadEliminarInscripcion() {
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
          url: "/Inscripcion/EliminarInscripcion", // Ruta del controlador para la eliminación
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
function loadGuardarOrden() {
  // Al hacer clic en el botón de guardar cambios
  $("#saveOrder").click(function () {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ordenar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("guardar order");
        // Capturar el data-id del card correspondiente

        var Ids = [];
        var Orders = [];
        var Pasos = [];
        var TituloPasos = [];
        var Descriptions = [];
        var UrlImagen = [];
        var NewOrders = [];

        // Iterar sobre cada card y capturar su data-id
        $(".btn-link.text-primary").each(function () {
          var id = $(this).data("id");
          Ids.push(id);

          var order = $(this).data("orden");
          Orders.push(order);

          var tituloPaso = $(this).data("titulopaso");
          TituloPasos.push(tituloPaso);

          var paso = $(this).data("paso");
          Pasos.push(paso);

          var description = $(this).data("description");
          Descriptions.push(description);

          var urlImagen = $(this).data("urlimagen");
          UrlImagen.push(urlImagen);
        });

        $(".card").each(function () {
          var NewOrder = $(this).find(".card-number").text().trim();
          NewOrders.push(NewOrder);
        });

        // Mostrar los data-id capturados en la consola (o hacer lo que necesites con ellos)
        console.log(Ids, NewOrders, UrlImagen, TituloPasos);
        // Aquí podrías realizar otras acciones con el data-id, como enviar una petición al servidor.

        var result = [];

        Ids.forEach((id, index) => {
          result.push({
            id: parseInt(id), // Coincide con BannerDto.Id
            orden: parseInt(NewOrders[index]), // Coincide con BannerDto.Orden
            tituloPaso: TituloPasos[index].toString(),
            paso: Pasos[index].toString(),
            description: Descriptions[index].toString(), // Coincide con BannerDto.Description
            UrlImagen: UrlImagen[index].toString(),
          });
        });

        // Mostrar el resultado en la consola
        console.log(result);
        console.log(JSON.stringify(result));

        $.ajax({
          url: "/Inscripcion/ActualizarOrdenInscripcion",
          type: "POST",
          contentType: "application/json; charset=utf-8", // Cabecera correcta
          data: JSON.stringify(result),
          success: function (response) {
            // Manejo de la respuesta
            if (response.success) {
              Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "El Inscripcion se ha actualizado exitosamente.",
                confirmButtonText: "Aceptar",
              }).then(() => {
                location.reload(); // Recargar la página o actualizar el contenido
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el Inscripcion. Inténtelo nuevamente.",
                confirmButtonText: "Aceptar",
              });
            }
          },
          error: function (xhr, status, error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al intentar actualizar el slider.",
              confirmButtonText: "Aceptar",
            });
          },
        });
      }
    });
  });
}
