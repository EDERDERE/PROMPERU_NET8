$(document).ready(function () {
  console.log("Caso exito");
  loadListarCasos();
  loadCrearCaso();
  loadEditarCaso();
  loadEliminarCaso();
  loadGuardarOrdenCaso();
});
async function loadListarCasos() {
  try {
    // Realiza la llamada AJAX usando fetch en lugar de jQuery
    const response = await $.ajax({
      type: "GET", // Método GET para obtener los casos
      url: "/Caso/ListarCasos", // URL del controlador que devuelve la lista de casos
      dataType: "json",
    });

    console.log(response);
    // Limpia los contenedores antes de renderizar los casos
    $("#sliderContainer").empty();
    $("#tituloContainer").empty();

    if (response.success) {
      const casos = response.casos;
      if (casos.length > 0) {
        renderTituloCaso(casos[0]); // Renderiza el título del caso
        renderSlidersCaso(casos); // Renderiza los sliders de los casos
      } else {
        $("#sliderContainer").html(
          "<p>No se encontraron Casos disponibles.</p>"
        );
      }
    } else {
      // Si no hay éxito en la respuesta, muestra un mensaje de error
      Swal.fire({
        icon: "error",
        title: "No hay Casos disponibles",
        text: response.message || "No se encontraron Casos.",
      });
    }
  } catch (error) {
    // En caso de error al realizar la llamada AJAX, muestra el error
    Swal.fire({
      icon: "error",
      title: "Error al cargar los casos",
      text: "Hubo un problema al cargar los Casos. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
function renderTituloCaso(caso) {
  const tituloCard = `     
       <div class="row ">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${caso.cexi_ID}" class="form-label fw-semibold">Título general</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                         data-id="${caso.cexi_ID}"   
                         data-titulo="${caso.cexi_Titulo}" 
                         data-urlvideo="${caso.cexi_UrlVideo}" 
                         data-titulovideo="${caso.cexi_TituloVideo}"
                         data-nombreboton="${caso.cexi_NombreBoton}" 
                         data-urlboton="${caso.cexi_UrlBoton}"
                         data-iconboton="${caso.cexi_UrlIcon}"
                         data-descripcionSeccion="${caso.cexi_Descripcion}"
                         data-urlbanner="${caso.cexi_UrlCabecera}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                        <input type="text" id="titulo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_Titulo}" disabled>
                </div>
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="nombreBoton-${caso.cexi_ID}" class="form-label fw-semibold">Nombre del botón</label> </div>
                    <input type="text" id="nombreBoton-${caso.cexi_ID}" class="form-control custom-button" placeholder="${caso.cexi_NombreBoton}"disabled>

                </div>
            </div>
            
            <div class="row ">
                
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="urlVideo-${caso.cexi_ID}" class="form-label fw-semibold">URL del botón</label>                       
                    </div>
                    <input type="text" id="urlVideo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_UrlBoton}" disabled>

                </div>

                  <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="urlVideo-${caso.cexi_ID}" class="form-label fw-semibold">URL del icono</label>                       
                    </div>
                    <input type="text" id="urlVideo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_UrlIcon}" disabled>

                </div>
            </div>

            <hr />

            <div class="row ">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="tituloVideo-${caso.cexi_ID}" class="form-label fw-semibold">Título de video</label>                        
                    </div>

                    <input type="text" id="tituloVideo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_TituloVideo}" disabled>
                </div>

                  <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="tituloVideo-${caso.cexi_ID}" class="form-label fw-semibold">Descripcion Sección</label>                        
                    </div>
                    <textarea  id="tituloVideo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_Descripcion}" disabled></textarea>

                </div>
                  <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="tituloVideo-${caso.cexi_ID}" class="form-label fw-semibold">URL del banner</label>                        
                    </div>

                    <input type="text" id="tituloVideo-${caso.cexi_ID}" class="form-control" placeholder="${caso.cexi_UrlCabecera}" disabled>
                            </div>

                

            </div>
    `;
  $("#tituloContainer").append(tituloCard);
}
function renderSlidersCaso(casos) {
  let slidersHTML = "";

  casos.forEach((caso) => {
    if (caso.cexi_Orden > 0) {
      slidersHTML += `
                               <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${caso.cexi_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0" 
                         data-id="${caso.cexi_ID}"   
                          id="btn-delete-${caso.cexi_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${caso.cexi_ID}"     
                                data-orden="${caso.cexi_Orden}" 
                                data-nombre="${caso.cexi_Nombre}"
                                data-description="${caso.cexi_Descripcion}"
                                data-urlicon="${caso.cexi_UrlIcon}"                    
                                data-urlperfil="${caso.cexi_UrlPerfil}"
                                data-urlvideo="${caso.cexi_UrlVideo}" 
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
                        <label for="nombre-${caso.cexi_Nombre}" class="form-label fw-semibold">Nombre</label>
                        <input type="text" id="nombre-${caso.cexi_Nombre}" class="form-control" placeholder="${caso.cexi_Nombre}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="description-${caso.cexi_Descripcion}" class="form-label fw-semibold">Descripción</label>
                        <textarea id="description-${caso.cexi_Descripcion}" class="form-control" rows="3" placeholder="${caso.cexi_Descripcion}"
                                  disabled></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="urlIcon-${caso.cexi_UrlIcon}" class="form-label fw-semibold">URL del ícono</label>
                        <input type="text" id="urlIcon-${caso.cexi_UrlIcon}" class="form-control" placeholder="${caso.cexi_UrlIcon}" disabled>
                    </div>

                    <div class="mb-3">
                        <label for="urlPerfil-${caso.cexi_UrlPerfil}" class="form-label fw-semibold">URL del Perfil</label>
                        <input type="text" id="urlPerfil-${caso.cexi_UrlPerfil}" class="form-control" placeholder="${caso.cexi_UrlPerfil}" disabled>
                    </div>

                    <div>
                        <label for="urlCabecera-${caso.cexi_UrlVideo}" class="form-label fw-semibold">URL del video</label>
                        <input type="text" id="urlCabecera-${caso.cexi_UrlVideo}" class="form-control" placeholder="${caso.cexi_UrlVideo}" disabled>
                    </div>

            </div>
                              `;
    }
  });

  $("#sliderContainer").append(slidersHTML);
}
async function loadCrearCaso() {
  $("#saveCreateSlider").click(async function () {
    // Recopilar datos del formulario
    const casoData = {
      nombre: $("#createNombre").val(),
      description: $("#createDescription").val(),
      urlIcon: $("#createUrlIcon").val(),
      urlPerfil: $("#createUrlPerfil").val(),
      urlVideo: $("#createUrlVideo").val(),
    };
    console.log(casoData);

    // Validar si todos los campos están completos
    if (Object.values(casoData).some((value) => !value.trim())) {
      await Swal.fire({
        title: "Advertencia",
        text: "Por favor, complete todos los campos obligatorios.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      // Realizar la solicitud al servidor
      const response = await $.ajax({
        type: "POST",
        url: "/Caso/InsertarCaso", // URL del controlador para crear el Caso
        data: casoData,
      });

      // Manejar la respuesta
      if (response.success) {
        await Swal.fire({
          title: "¡Éxito!",
          text: "Caso creado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        location.reload(); // Recargar la página para reflejar los cambios
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Hubo un error al crear el Caso.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      // Manejar errores de la solicitud AJAX
      console.error("Error al intentar crear el Caso:", error);
      await Swal.fire({
        title: "Error",
        text: "Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  });
}
async function loadEditarCaso() {
  const assignModalValues = (modal, data) => {
    Object.keys(data).forEach((key) => {
      modal.find(`#${key}`).val(data[key]);
    });
  };

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

  // Función para manejar el AJAX de manera asincrónica
  const handleAjaxRequest = async (url, data, successMessage, errorMessage) => {
    try {
      const response = await $.ajax({
        type: "POST",
        url: url,
        data: data,
      });

      if (response.success) {
        showAlert("success", "¡Éxito!", successMessage, () =>
          location.reload()
        );
      } else {
        showAlert("error", "Error", errorMessage);
      }
    } catch (error) {
      showAlert("error", "Error", "Hubo un error al procesar la solicitud.");
    }
  };

  $("#editTitle").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    const modalData = {
      editIdTitulo: button.data("id"),
      editTitulo: button.data("titulo"),
      editNombreBoton: button.data("nombreboton"),
      editUrlBoton: button.data("urlboton"),
      editTituloVideo: button.data("titulovideo"),
      editUrldelIcono: button.data("iconboton"),
      editDescripcionSeccion: button.data("descripcionseccion"),
      editbannerSeccion: button.data("urlbanner"),
    };

    assignModalValues($(this), modalData);
  });

  $("#saveEditTitulo").click(function () {
    const data = {
      id: $("#editIdTitulo").val(),
      titulo: $("#editTitulo").val(),
      nombreBoton: $("#editNombreBoton").val(),
      urlBoton: $("#editUrlBoton").val(),
      tituloVideo: $("#editTituloVideo").val(),
      urlIcon: $("#editUrldelIcono").val(),
      description: $("#editDescripcionSeccion").val(),
      urlCabecera: $("#editbannerSeccion").val(),
    };

    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Caso/ActualizarCaso",
        data,
        "El Caso se ha actualizado exitosamente.",
        "No se pudo actualizar el Caso."
      );
    } else {
      showAlert(
        "warning",
        "Campos incompletos",
        "Por favor, complete todos los campos antes de continuar."
      );
    }
  });

  $("#editSliderModal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    const modalData = {
      editId: button.data("id"),
      editOrder: button.data("orden"),
      editNombre: button.data("nombre"),
      editDescription: button.data("description"),
      editUrlIcon: button.data("urlicon"),
      editUrlPerfil: button.data("urlperfil"),
      editUrlVideo: button.data("urlvideo"),
    };

    assignModalValues($(this), modalData);
  });



  $("#saveEditSlider").click(function () {
    const data = {
      id: $("#editId").val(),
      orden: $("#editOrder").val(),
      nombre: $("#editNombre").val(),
      description: $("#editDescription").val(),
      urlIcon: $("#editUrlIcon").val(),
      urlPerfil: $("#editUrlPerfil").val(),
        urlVideo: $("#editUrlVideo").val(),
    };
    console.log('guardar caso',data)
    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Caso/ActualizarCaso",
        data,
        "El Caso se ha actualizado exitosamente.",
        "No se pudo actualizar el Caso."
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
async function loadEliminarCaso() {
  // Función para mostrar alertas de éxito o error
  const showAlert = (type, title, text) => {
    return Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Aceptar",
    });
  };

  // Función para realizar la eliminación a través de AJAX
  const eliminarCaso = async (id) => {
    try {
      const response = await $.ajax({
        type: "POST",
        url: "/Caso/EliminarCaso", // Ruta del controlador para la eliminación
        data: { id: id },
      });

      if (response.success) {
        await showAlert(
          "success",
          "¡Eliminado!",
          "El Caso ha sido eliminado con éxito."
        );
        location.reload(); // Recargar la página o actualizar el contenido dinámicamente
      } else {
        await showAlert(
          "error",
          "Error",
          "No se pudo eliminar el Caso. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      await showAlert(
        "error",
        "Error",
        "Hubo un error en el servidor al intentar eliminar el Caso."
      );
    }
  };

  // Capturar clics en los botones de eliminación
  $(document).on("click", '[id^="btn-delete-"]', function () {
    const id = $(this).data("id"); // Obtener el ID del Caso a eliminar
    console.log(`ID a eliminar: ${id}`);

    // Confirmar eliminación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarCaso(id); // Llamar a la función para eliminar el Caso
      }
    });
  });
}
async function loadGuardarOrdenCaso() {
  // Función para mostrar alerta de éxito o error
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

  // Función para recolectar datos de las cards
  const obtenerDatosCards = () => {
    const data = {
      Ids: [],
      Orders: [],
      Nombres: [],
      Descriptions: [],
      UrlIcons: [],
      UrlPerfiles: [],
      UrlCabeceras: [],
      NewOrders: [],
    };

    $(".btn-link.text-primary").each(function () {
      data.Ids.push($(this).data("id"));
      data.Orders.push($(this).data("orden"));
      data.Nombres.push($(this).data("nombre"));
      data.Descriptions.push($(this).data("description"));
      data.UrlIcons.push($(this).data("urlicon"));
      data.UrlPerfiles.push($(this).data("urlperfil"));
      data.UrlCabeceras.push($(this).data("urlcabecera"));
    });

    $(".card").each(function () {
      data.NewOrders.push($(this).find(".card-number").text().trim());
    });

    return data;
  };

  // Función para estructurar los datos para el servidor
  const estructurarDatos = (data) => {
    return data.Ids.map((id, index) => ({
      id: parseInt(id),
      orden: parseInt(data.NewOrders[index]),
      nombre: data.Nombres[index].toString(),
      description: data.Descriptions[index].toString(),
      urlIcon: data.UrlIcons[index].toString(),
      urlPerfil: data.UrlPerfiles[index].toString(),
      urlCabecera: data.UrlCabeceras[index].toString(),
    }));
  };

  // Función para realizar la solicitud AJAX de manera asincrónica
  const realizarSolicitud = async (data) => {
    try {
      const response = await $.ajax({
        url: "/Caso/ActualizarOrdenCaso",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el Caso.");
    }
  };

  // Al hacer clic en el botón de guardar cambios
  $("#saveOrder").click(async function () {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ordenar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        console.log("guardar orden");

        // Obtener los datos de las cards
        const data = obtenerDatosCards();
        const resultData = estructurarDatos(data);

        // Mostrar el resultado en consola (o lo que necesites hacer con los datos)
        console.log(resultData);
        console.log(JSON.stringify(resultData));

        // Realizar la solicitud AJAX para actualizar la orden
        const response = await realizarSolicitud(resultData);

        if (response.success) {
          showAlert(
            "success",
            "¡Actualizado!",
            "El Caso se ha actualizado exitosamente.",
            () => {
              location.reload(); // Recargar la página o actualizar el contenido
            }
          );
        } else {
          showAlert(
            "error",
            "Error",
            "No se pudo actualizar el Caso. Inténtelo nuevamente."
          );
        }
      } catch (error) {
        showAlert(
          "error",
          "Error",
          error.message || "Ocurrió un error desconocido."
        );
      }
    }
  });
}
