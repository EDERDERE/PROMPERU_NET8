$(document).ready(function () {
  console.log("Caso exito");
  loadListarEmpresas();
  loadCrearEmpresa();
  loadEditarEmpresa();
  loadEliminarEmpresa();
  loadGuardarOrdenCaso();
});
async function loadListarEmpresas() {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/Empresa/ListarEmpresas",
      dataType: "json",
    });
    $("#sliderContainer").empty();
    $("#tituloContainer").empty();

    if (response.success) {
      const empresas = response.empresas;
      if (empresas.length > 0) {
        renderTituloCaso(empresas[0]);
        renderSlidersCaso(empresas);
      } else {
        $("#sliderContainer").html(
          "<p>No se encontraron Casos disponibles.</p>"
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay Casos disponibles",
        text: response.message || "No se encontraron Casos.",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error al cargar los casos",
      text: "Hubo un problema al cargar los Casos. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
function renderTituloCaso(empresa) {
  const tituloCard = `     
       <div class="row ">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="titulo-${empresa.egra_ID}" class="form-label fw-semibold">Nombre del boton</label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                         data-id="${empresa.egra_ID}"   
                         data-nombreboton="${empresa.egra_NombreBoton}" 
                         data-titulo="${empresa.egra_Titulo}" 
                         data-urlboton="${empresa.egra_UrlBoton}"
                          data-descripcion="${empresa.egra_Descripcion}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                        <input type="text" id="titulo-${empresa.egra_ID}" class="form-control" placeholder="${empresa.egra_NombreBoton}" disabled>
                </div>
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="nombreBoton-${empresa.egra_ID}" class="form-label fw-semibold">Titulo</label> </div>
                    <input type="text" id="nombreBoton-${empresa.egra_ID}" class="form-control " placeholder="${empresa.egra_Titulo}"disabled>

                </div>

                
            </div>
            
            <div class="row ">
                 <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="nombreBoton-${empresa.egra_ID}" class="form-label fw-semibold">Icono del boton</label> </div>
                    <input type="text" id="nombreBoton-${empresa.egra_ID}" class="form-control " placeholder="${empresa.egra_UrlBoton}"disabled>

                </div>
              
                 
            </div>

            <hr />

            <div class="row ">
              

                 <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="urlVideo-${empresa.egra_ID}" class="form-label fw-semibold">Descripcion</label>                       
                    </div>
                       <textarea  id="tituloVideo-${empresa.egra_ID}" class="form-control" rows="3"  placeholder="${empresa.egra_Descripcion}" disabled></textarea>

                </div>

                

            </div>
    `;
  $("#tituloContainer").append(tituloCard);
}
function renderSlidersCaso(empresas) {
  console.log(empresas);
  let slidersHTML = "";

  empresas.forEach((empresa) => {
    if (empresa.egra_Orden >= 1) {
      slidersHTML += `
                <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${empresa.egra_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0" 
                         data-id="${empresa.egra_ID}"   
                          id="btn-delete-${empresa.egra_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${empresa.egra_ID}"     
                                data-orden="${empresa.egra_Orden}" 
                                data-descripcioncard="${empresa.egra_Descripcion}" 
                                data-correo="${empresa.egra_Correo}"
                                data-nombreempresa="${empresa.egra_NombreEmpresa}"
                                data-descripcionSeccion="${empresa.egra_Descripcion}"
                                data-urllogo="${empresa.egra_UrlLogo}"
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
                        <label for="nombre-${empresa.egra_ID}" class="form-label fw-semibold">Nombre </label>
                        <input type="text" id="nombre-${empresa.egra_ID}" class="form-control" placeholder="${empresa.egra_NombreEmpresa}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="description-${empresa.egra_ID}" class="form-label fw-semibold">Descripción</label>
                        <textarea id="description-${empresa.egra_ID}" class="form-control" rows="3" placeholder="${empresa.egra_Descripcion}"
                                  disabled></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="urlIcon-${empresa.egra_ID}" class="form-label fw-semibold">Correo</label>
                        <input type="text" id="urlIcon-${empresa.egra_ID}" class="form-control" placeholder="${empresa.egra_Correo}" disabled>
                    </div>

                    <div class="mb-3">
                        <label for="urlPerfil-${empresa.egra_ID}" class="form-label fw-semibold">Logo de empresa</label>
                        <input type="text" id="urlPerfil-${empresa.egra_ID}" class="form-control" placeholder="${empresa.egra_UrlLogo}" disabled>
                    </div>

                 

            </div>
                              `;
    }
  });

  $("#sliderContainer").append(slidersHTML);
}
async function loadCrearEmpresa() {
  $("#saveCreateSlider").click(async function () {

    const empresaData = {
      nombreEmpresa: $("#createNombreEmpresa").val(),
      descripcion: $("#createDescripccionEmpresa").val(),
      correo: $("#createCorreoEmpresa").val(),
      urlLogo: $("#createLogoEmpresa").val(),
    };

    if (Object.values(empresaData).some((value) => !value.trim())) {
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
        url: "/Empresa/InsertarEmpresa", // URL del controlador para crear el Caso
        data: empresaData,
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
async function loadEditarEmpresa() {
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
      editId: button.data("id"),
      editTitulo: button.data("titulo"),
      editNombreBoton: button.data("nombreboton"),
      editIconoBoton: button.data("urlboton"),
      editDescripcion: button.data("descripcion"),
    };

    assignModalValues($(this), modalData);
  });

  $("#saveEditTitulo").click(function () {
    const data = {
      id: $("#editId").val(),
      titulo: $("#editTitulo").val(),
      nombreBoton: $("#editNombreBoton").val(),
      urlBoton: $("#editIconoBoton").val(),
      descripcion: $("#editDescripcion").val(),
        id_tipoempresa: 1,
      id_region:1
    };

    console.log(data);

    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Empresa/ActualizarEmpresa",
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
      editIdEmpresa: button.data("id"),
      editOrdenEmpresa: button.data("orden"),
      editNombreEmpresa: button.data("nombreempresa"),
      editDescripccionEmpresa: button.data("descripcioncard"),
      editCorreoEmpresa: button.data("correo"),
      editLogoEmpresa: button.data("urllogo"),
    };

    console.log(modalData);

    assignModalValues($(this), modalData);
  });

  $("#saveEditSlider").click(function () {
    const data = {
      id: $("#editIdEmpresa").val(),
      orden: $("#editOrdenEmpresa").val(),
      nombre: $("#editNombreEmpresa").val(),
      description: $("#editDescripccionEmpresa").val(),
      correo: $("#editCorreoEmpresa").val(),
      logo: $("#editLogoEmpresa").val(),
    };

    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Empresa/ActualizarEmpresa",
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
async function loadEliminarEmpresa() {
 
  const showAlert = (type, title, text) => {
    return Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Aceptar",
    });
  };

  // Función para realizar la eliminación a través de AJAX
  const eliminarEmpresa = async (id) => {
    try {
      const response = await $.ajax({
        type: "POST",
        url: "/Empresa/EliminarEmpresa", // Ruta del controlador para la eliminación
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
        await eliminarEmpresa(id);
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
