$(document).ready(function () {
  console.log("Requisitos");
  loadListarRequisitos();
  loadCrearRequisito();
  loadEditarRequisito();
  loadEliminarRequisito();
  loadGuardarOrden();
});

function loadListarRequisitos() {
  $.ajax({
    type: "GET", // Método GET para obtener los sliders
    url: "/Requisito/ListarRequisitos", // URL del controlador que devuelve la lista de sliders
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Limpia el contenedor de sliders antes de renderizar
      $("#sliderContainer").empty();
      if (response.success) {
        // Itera sobre la respuesta y crea las tarjetas dinámicamente
        console.log("obtener el tirulo Requisito", response.requisitos[0]);
        var requisito = response.requisitos[0];
        var tituloCard = `
                 <div class="col-md-6">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.requ_ID}" class="form-label fw-semibold">Titulo</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                        data-id="${requisito.requ_ID}"
                        data-titulo="${requisito.requ_Titulo}"
                        data-descripcion="${requisito.requ_Descripcion}"
                        data-tituloSeccion="${requisito.requ_TituloSeccion}"
                        data-urlImagen="${requisito.requ_URLImagen}"
                        data-urlIcon="${requisito.requ_URLIcon}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                    <input type="text" id="titulo-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_Titulo}" disabled>
                </div>
                    <div class="col-md-6 mb-2">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.requ_ID}" class="form-label fw-semibold">descripcion del banner</label>
                    
                    </div>
                    <input type="text" id="titulo-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_Descripcion}" disabled>
                </div>

                 <div class="col-md-6 ">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.requ_ID}" class="form-label fw-semibold">URL del banner</label>
                    
                    </div>
                    <input type="text" id="titulo-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_URLImagen}" disabled>
                </div>

                 <div class="col-md-6  mb-2">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.requ_ID}" class="form-label fw-semibold">Titulo seccion</label>
                    
                    </div>
                    <input type="text" id="titulo-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_TituloSeccion}" disabled>
                </div>

                 <div class="col-md-6 ">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${requisito.requ_ID}" class="form-label fw-semibold">URl del icono</label>
                    
                    </div>
                    <input type="text" id="titulo-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_URLIcon}" disabled>
                </div>
                    `;
        // Agregar el slider al contenedor
        $("#tituloContainer").append(tituloCard);

        response.requisitos.forEach((requisito) => {
          if (requisito.requ_Orden > 0) {
            console.log("lista Requisito", requisito);

            var sliderCard = `
                               <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${requisito.requ_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0"
                        data-id="${requisito.requ_ID}"  
                        id="btn-delete-${requisito.requ_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${requisito.requ_ID}"
                                data-orden="${requisito.requ_Orden}"
                          data-nombre="${requisito.requ_Nombre}"
                            data-description="${requisito.requ_Descripcion}"
                              data-urlicon="${requisito.requ_URLIcon}"
                              data-urlImagen="${requisito.requ_URLImagen}"
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
                    <label for="nombre-${requisito.requ_ID}" class="form-label fw-semibold">Nombre</label>
                    <input type="text" id="nombre-${requisito.requ_ID}" class="form-control" placeholder="${requisito.requ_Nombre}" disabled>
                </div>

                <div class="mb-3">
                    <label for="description-${requisito.requ_ID}" class="form-label fw-semibold">Descripción</label>
                    <textarea id="description-${requisito.requ_ID}" class="form-control" rows="3" placeholder="${requisito.requ_Descripcion}"
                              disabled></textarea>
                </div>

                <div>
                    <label for="icon-url-${requisito.requ_ID}" class="form-label fw-semibold">URL de ícono</label>
                    <input type="text" id="icon-url-${requisito.requ_ID}" class="form-control" value="${requisito.requ_URLIcon}" disabled>
                </div>

                 <hr>

              <div class="mb-3">
                <label for="icon-url-${requisito.requ_ID}" class="form-label fw-semibold">URL de imagen</label>
                <input type="text"  id="icon-url-${requisito.requ_ID}" class="form-control" value="${requisito.requ_URLImagen}" disabled>
              </div>
            </div>`;
            // Agregar el slider al contenedor
            $("#sliderContainer").append(sliderCard);
          }
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
function loadCrearRequisito() {
  $("#saveCreateSlider").click(function () {
    var nombre = $("#createNombre").val();
    var description = $("#createDescription").val();
    var urlIcon = $("#createUrlIcon").val();
    var urlImagen = $("#createImagenUrl").val();
    if (description && urlIcon && nombre && urlImagen) {
      $.ajax({
        type: "POST",
        url: "/Requisito/InsertarRequisito", // URL del controlador para crear el slider
        data: {
          nombre: nombre,
          description: description,
          urlIcon: urlIcon,
          urlImagen: urlImagen,
        },
        success: function (response) {
          console.log("Crear", response);
          // Manejo de la respuesta
          if (response.success) {
            Swal.fire({
              title: "¡Éxito!",
              text: "Requisito creado exitosamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(function () {
              location.reload(); // Recargar la página o actualizar el contenido
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al crear el requisito",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        },
        error: function () {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al intentar crear el requisito",
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
function loadEditarRequisito() {
  $("#editTitle").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal
    var id = button.data("id"); // Obtener el ID
    var titulo = button.data("titulo");
    var descripcion = button.data("descripcion");
    var tituloSeccion = button.data("tituloseccion");
    var urlImagen = button.data("urlimagen");

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editTitulo").val(titulo);
    modal.find("#editDescripcion").val(descripcion);
    modal.find("#editTituloSection").val(tituloSeccion);
    modal.find("#editUrlImagen").val(urlImagen);
  });
  $("#saveEditTitulo").click(function () {
    var id = $("#editId").val();
    var titulo = $("#editTitulo").val();
    var descripcion = $("#editDescripcion").val();
    var tituloSeccion = $("#editTituloSection").val();
    var urlImagen = $("#editUrlImagen").val();
    console.log("editar modal titulo", id, titulo);
    if (id && titulo && descripcion && tituloSeccion && urlImagen) {
      $.ajax({
        type: "POST",
        url: "/Requisito/ActualizarRequisito", // URL del controlador para editar el slider
        data: {
          id: id,
          titulo: titulo,
          tituloSeccion: tituloSeccion,
          description: descripcion,
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

  $("#editSliderModal").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    var button = $(event.relatedTarget); // El botón que activó el modal
    var id = button.data("id"); // Obtener el ID
    var orden = button.data("orden");
    var nombre = button.data("nombre");
    var description = button.data("description"); // Obtener la descripción
    var urlIcon = button.data("urlicon"); // Obtener la URL de la imagen
    var urlImagen = button.data("urlimagen");

    console.log(description, 'nombre')

    // Asignar los valores al modal
    var modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editOrder").val(orden);
    modal.find("#editNombre").val(nombre);
    modal.find("#editDescription").val(description); // Llenar el textarea con la descripción
    modal.find("#editUrlIcon").val(urlIcon); // Llenar el campo de la URL de la imagen
    modal.find("#editImagen").val(urlImagen);
  });
  $("#saveEditSlider").click(function () {
    console.log("editar modal");
    var nombre = $("#editNombre").val();
    var description = $("#editDescription").val();
    var urlIcon = $("#editUrlIcon").val();
    var orden = $("#editOrder").val();
    var id = $("#editId").val();
    var urlImagen = $("#editImagen").val()

    if (description && urlIcon && nombre) {
      $.ajax({
        type: "POST",
        url: "/Requisito/ActualizarRequisito", // URL del controlador para editar el slider
        data: {
          id: id,
          orden: orden,
          nombre: nombre,
          description: description,
          urlIcon: urlIcon,
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
function loadEliminarRequisito() {
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
          url: "/Requisito/EliminarRequisito", // Ruta del controlador para la eliminación
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
        var Titulos = [];
        var Nombres = [];
        var Descriptions = [];
        var UrlIcons = [];
        var NewOrders = [];

        // Iterar sobre cada card y capturar su data-id
        $(".btn-link.text-primary").each(function () {
          var Id = $(this).data("id");
          Ids.push(Id);

          var Order = $(this).data("orden");
          Orders.push(Order);

          var Titulo = $(this).data("titulo");
          Titulos.push(Titulo);

          var Nombre = $(this).data("nombre");
          Nombres.push(Nombre);

          var Description = $(this).data("description");
          Descriptions.push(Description);

          var UrlIcon = $(this).data("urlicon");
          UrlIcons.push(UrlIcon);
        });

        $(".card").each(function () {
          var NewOrder = $(this).find(".card-number").text().trim();
          NewOrders.push(NewOrder);
        });

        // Mostrar los data-id capturados en la consola (o hacer lo que necesites con ellos)
        console.log(Ids, NewOrders, UrlIcons);
        // Aquí podrías realizar otras acciones con el data-id, como enviar una petición al servidor.

        var result = [];

        Ids.forEach((id, index) => {
          result.push({
            id: parseInt(id), // Coincide con BannerDto.Id
            orden: parseInt(NewOrders[index]), // Coincide con BannerDto.Orden
            titulo: null,
            nombre: Nombres[index].toString(),
            description: Descriptions[index].toString(), // Coincide con BannerDto.Description
            UrlIcon: UrlIcons[index].toString(), // Coincide con BannerDto.ImageUrl
            UrlImagen: null,
          });
        });

        // Mostrar el resultado en la consola
        console.log(result);
        console.log(JSON.stringify(result));

        $.ajax({
          url: "/Requisito/ActualizarOrdenRequisito",
          type: "POST",
          contentType: "application/json; charset=utf-8", // Cabecera correcta
          data: JSON.stringify(result),
          success: function (response) {
            // Manejo de la respuesta
            if (response.success) {
              Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "El Requisito se ha actualizado exitosamente.",
                confirmButtonText: "Aceptar",
              }).then(() => {
                location.reload(); // Recargar la página o actualizar el contenido
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el Requisito. Inténtelo nuevamente.",
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
