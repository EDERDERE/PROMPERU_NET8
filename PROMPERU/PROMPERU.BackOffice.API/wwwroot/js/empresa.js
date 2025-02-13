$(document).ready(function () {
  console.log("Empresa exito");
  loadListarEmpresas();
  loadCrearEmpresa();
  loadEditarEmpresa();
  loadEliminarEmpresa();
    loadGuardarOrdenEmpresa();
    cargarTiposEmpresa("inputTipoEmpresa","");
    cargarTiposRegion("inputTipoRegion", "");
 DescargaEmpresa()
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
        renderTituloEmpresa(empresas[0]);
        renderSlidersEmpresa(empresas);
      } else {
        $("#sliderContainer").html(
          "<p>No se encontraron Empresa disponibles.</p>"
        );
      }
    } else {
      Swal.fire({
        icon: "error",
          title: "No hay Empresa disponibles",
          text: response.message || "No se encontraron Empresa.",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
        title: "Error al cargar los Empresa",
        text: "Hubo un problema al cargar los Empresa. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
function renderTituloEmpresa(empresa) {
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
function renderSlidersEmpresa(empresas) {
  console.log(empresas);
  let slidersHTML = "";

    empresas.forEach((egra) => {
        if (egra.egra_Orden >= 1) {
      slidersHTML += `
                <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-number mb-0">${egra.egra_Orden}</h5>
                <div class="d-flex gap-2">
                  <button class="btn btn-link text-danger p-0" data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmationModal"
                    data-id="${egra.egra_ID}"  
                     id="btn-delete-${egra.egra_ID}"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                  <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                    data-bs-target="#editSliderModal"
                       data-id="${egra.egra_ID}"        
                       data-orden="${egra.egra_Orden}"   
                          data-descripcion="${egra.egra_Descripcion}"
                               data-nombrecomercial="${egra.egra_NombreEmpresa}" 
                         data-idregion="${egra.iD_Region}" 
                         data-correo="${egra.egra_Correo}"
                          data-pagina="${egra.egra_PaginaWeb}"
                               data-ruc="${egra.egra_RUC}" 
                         data-redes="${egra.egra_RedesSociales}" 
                         data-idempresa="${egra.iD_TipoEmpresa}"
                          data-certificaciones="${egra.egra_Certificaciones}"
                             data-razon="${egra.egra_RazonSocial}" 
                         data-mercados="${egra.egra_Mercados}" 
                         data-urllogo="${egra.egra_UrlLogo}"
                          data-segmentos="${egra.egra_SegmentosAtendidos}"
                              data-direccion="${egra.egra_Direccion}"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>

                  <div class="sortable-handle d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="nombrecomercial-${egra.egra_ID}" class="form-label fw-semibold">Nombre Comercial</label>
                    <input type="text" id="nombrecomercial-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_NombreEmpresa}" disabled>
                  </div>

                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Región</label>
                    <select class="form-select" id="region-${egra.egra_ID}" aria-label="Default select example" disabled>
                      <option  value="${egra.iD_Region}">${egra.region}</option>                     
                    </select>
                  </div>
                </div>
              </div>            

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="correo-${egra.egra_ID}" class="form-label fw-semibold">Correo Electronico</label>
                    <input type="text" id="correo-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_Correo}" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="correo-${egra.egra_ID}" class="form-label fw-semibold">Página web</label>
                    <input type="text" id="correo-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_PaginaWeb}" disabled>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="correo-${egra.egra_ID}" class="form-label fw-semibold">RUC</label>
                    <input type="text" id="correo-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_RUC}" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="correo-${egra.egra_ID}" class="form-label fw-semibold">Redes sociales</label>
                    <input type="text" id="correo-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_RedesSociales}" disabled>

                  </div>
                </div>
              </div>

              <div class="row">
                  <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Tipo Empresa</label>
                    <select class="form-select" id="region-${egra.egra_ID}" aria-label="Default select example" disabled>
                      <option  value="${egra.iD_TipoEmpresa}">${egra.tipoEmpresa}</option>                     
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Certificaciones</label>
                    <input type="text" id="region-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_Certificaciones}" disabled>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">URL de la Logo</label>
                    <input type="text" id="region-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_UrlLogo}" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Mercados</label>
                 <input type="text" id="region-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_Mercados}" disabled>

                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Razon social</label>
                    <input type="text" id="region-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_RazonSocial}" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="region-${egra.egra_ID}" class="form-label fw-semibold">Segmentos atendidos</label>
                    <input type="text" id="region-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_SegmentosAtendidos}" disabled>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="direcion-${egra.egra_ID}" class="form-label fw-semibold">Dirección</label>
                    <input type="text" id="direccion-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_Direccion}" disabled>
                  </div>
                </div>
                 <div class="col-md-6">
                  <div class="mb-3">
                    <label for="description-${egra.egra_ID}" class="form-label fw-semibold">Descripción</label>
                    <input type="text" id="descripction-${egra.egra_ID}" class="form-control" placeholder="${egra.egra_Descripcion}" disabled>
                  </div>
                </div>

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
        nombreEmpresa: $("#createNombreComercial").val(),
        id_region: $("#inputTipoRegion").val(),
        correo: $("#createCorreo").val(),
        paginaWeb: $("#createPagina").val(),
        rUC: $("#createRuc").val(),
        redesSociales: $("#createRedes").val(),
        id_tipoempresa: $("#inputTipoEmpresa").val(),
        certificaciones: $("#createCertificaciones").val(),
        urlLogo: $("#createUrlLogo").val(),
        mercados: $("#createMercados").val(),
        razonSocial: $("#createRazon").val(),
        segmentosAtendidos: $("#createSegmentos").val(),
        direccion: $("#createDireccion").val(), 
        descripcion: $("#createDescription").val()
    };
      console.log(empresaData,'empresaData')
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
        url: "/Empresa/InsertarEmpresa", // URL del controlador para crear el Empresa
        data: empresaData,
      });

      // Manejar la respuesta
      if (response.success) {
        await Swal.fire({
          title: "¡Éxito!",
          text: "Empresa creado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        location.reload(); // Recargar la página para reflejar los cambios
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Hubo un error al crear el Empresa.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      // Manejar errores de la solicitud AJAX
      console.error("Error al intentar crear el Empresa:", error);
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
        "El Empresa se ha actualizado exitosamente.",
        "No se pudo actualizar el Empresa."
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
        editNombreComercial: button.data("nombrecomercial"),
        editTipoRegion: button.data("idregion"),
        editCorreo: button.data("correo"),
        editPagina: button.data("pagina"),
        editRuc: button.data("ruc"),
        editRedes: button.data("redes"),
        editTipoEmpresa: button.data("idempresa"),
        editUrlLogo: button.data("urllogo"),
        editMercados: button.data("mercados"),
        editRazon: button.data("razon"),
        editSegmentos: button.data("segmentos"),
        editCertificaciones: button.data("certificaciones"),
        editDireccion: button.data("direccion"),
        editDescription: button.data("descripcion"), 
    };

      console.log(modalData,'modalData');

      assignModalValues($(this), modalData);
      cargarTiposEmpresa("editTipoEmpresa", modalData.editTipoEmpresa);
      cargarTiposRegion("editTipoRegion", modalData.editTipoRegion);  
  });

  $("#saveEditSlider").click(function () {
    const data = {
      id: $("#editIdEmpresa").val(),
        orden: $("#editOrdenEmpresa").val(),
        nombreEmpresa: $("#editNombreComercial").val(),
        id_region: $("#editTipoRegion").val(),
        correo: $("#editCorreo").val(),
        paginaWeb: $("#editPagina").val(),
        rUC: $("#editRuc").val(),
        redesSociales: $("#editRedes").val(),
        id_tipoempresa: $("#editTipoEmpresa").val(),
        certificaciones: $("#editCertificaciones").val(),
        urlLogo: $("#editUrlLogo").val(),
        mercados: $("#editMercados").val(),
        razonSocial: $("#editRazon").val(),
        segmentosAtendidos: $("#editSegmentos").val(),
        direccion: $("#editDireccion").val(),    
        descripcion: $("#editDescription").val(),     
    };

    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Empresa/ActualizarEmpresa",
        data,
        "El Empresa se ha actualizado exitosamente.",
        "No se pudo actualizar el Empresa."
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
          "El Empresa ha sido eliminado con éxito."
        );
        location.reload(); // Recargar la página o actualizar el contenido dinámicamente
      } else {
        await showAlert(
          "error",
          "Error",
          "No se pudo eliminar el Empresa. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      await showAlert(
        "error",
        "Error",
        "Hubo un error en el servidor al intentar eliminar el Empresa."
      );
    }
  };

  // Capturar clics en los botones de eliminación
  $(document).on("click", '[id^="btn-delete-"]', function () {
    const id = $(this).data("id"); // Obtener el ID del Empresa a eliminar
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
async function loadGuardarOrdenEmpresa() {
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
        Descriptions: [],
        Nombres: [],
        IdRegions: [],
        Correos: [],
        Paginas: [],
        Rucs: [],
        Redes: [],
        IdEmpresas: [],
        Certificaciones: [],
        Razones: [],
        Mercados: [],
        UrlLogos: [],
        Segmentos: [],
        Direcciones: [],
        NewOrders: [],
    };

    $(".btn-link.text-primary").each(function () {
        data.Ids.push($(this).data("id"));
        data.Orders.push($(this).data("orden"));
        data.Descriptions.push($(this).data("descripcion"));
        data.Nombres.push($(this).data("nombrecomercial"));
        data.IdRegions.push($(this).data("idregion"));
        data.Correos.push($(this).data("correo"));
        data.Paginas.push($(this).data("pagina"));
        data.Rucs.push($(this).data("ruc"));
        data.Redes.push($(this).data("redes"));
        data.IdEmpresas.push($(this).data("idempresa"));
        data.Certificaciones.push($(this).data("certificaciones"));
        data.Razones.push($(this).data("razon"));
        data.Mercados.push($(this).data("mercados"));
        data.UrlLogos.push($(this).data("urllogo"));
        data.Segmentos.push($(this).data("segmentos"));
        data.Direcciones.push($(this).data("direccion"));
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
        orden: parseInt(data.NewOrders[index]),  // Utilizar NewOrders o el valor de Orders si no existe NewOrders
        nombreEmpresa: data.Nombres[index].toString(),
        descripcion: data.Descriptions[index].toString(),
        id_region: parseInt(data.IdRegions[index]),
        correo: data.Correos[index].toString(),
        paginaWeb: data.Paginas[index].toString(),
        rUC: data.Rucs[index].toString(),
        redesSociales: data.Redes[index].toString(),
        id_tipoempresa: parseInt(data.IdEmpresas[index]),
        certificaciones: data.Certificaciones[index].toString(),
        razonSocial: data.Razones[index].toString(),
        mercados: data.Mercados[index].toString(),
        urlLogo: data.UrlLogos[index].toString(),
        segmentos: data.Segmentos[index].toString(),
        direccion: data.Direcciones[index].toString(),
    }));
  };

  // Función para realizar la solicitud AJAX de manera asincrónica
  const realizarSolicitud = async (data) => {
    try {
      const response = await $.ajax({
        url: "/Empresa/ActualizarOrdenEmpresa",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el Empresa.");
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
            "El Empresa se ha actualizado exitosamente.",
            () => {
              location.reload(); // Recargar la página o actualizar el contenido
            }
          );
        } else {
          showAlert(
            "error",
            "Error",
            "No se pudo actualizar el Empresa. Inténtelo nuevamente."
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

async function cargarTiposEmpresa(selectElementId, Tipovalor) {
    console.log(selectElementId, Tipovalor, 'cargarTiposEmpresa');

    try {
        const response = await $.ajax({
            url: "/Empresa/ListarTipoEmpresas",
            type: "GET",
            dataType: "json",
        });

        console.log("Lista de tipos de Empresas:", response);

        const select = $("#" + selectElementId);
        select.empty().append("<option selected>Seleccione su tipo</option>");

        if (
            Array.isArray(response.tipoEmpresas) &&
            response.tipoEmpresas.length > 0
        ) {
            response.tipoEmpresas.forEach((tipo) => {                
                if (tipo.temp_ID === Tipovalor) {
                    select.append(new Option(tipo.temp_Nombre, tipo.temp_ID, true, true));
                } else {
                    select.append(new Option(tipo.temp_Nombre, tipo.temp_ID));
                }
            });

        } else {
            select.append(
                "<option disabled>No hay tipos de Empresas disponibles</option>"
            );
        }
    } catch (error) {
        console.error("Error al cargar los tipos de Empresas:", error);
        $("#" + selectElementId)
            .empty()
            .append("<option disabled>Error al cargar tipos de Empresas</option>");

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al cargar los tipos de Empresas. Inténtelo más tarde.",
        });
    }
}
async function cargarTiposRegion(selectElementId, Tipovalor) {
    console.log(selectElementId, Tipovalor, 'cargarTiposRegion');

    try {
        const response = await $.ajax({
            url: "/Empresa/ListarRegiones",
            type: "GET",
            dataType: "json",
        });

        console.log("Lista de tipos de Regions:", response);

        const select = $("#" + selectElementId);
        select.empty().append("<option selected>Seleccione su tipo</option>");

        if (
            Array.isArray(response.regions) &&
            response.regions.length > 0
        ) {
            response.regions.forEach((tipo) => {
          
                // If the current tipo.tmod_ID matches Tipovalor, mark it as selected
                if (tipo.regi_ID === Tipovalor) {
                    select.append(new Option(tipo.regi_Nombre, tipo.regi_ID, true, true));
                } else {
                    select.append(new Option(tipo.regi_Nombre, tipo.regi_ID));
                }
            });

        } else {
            select.append(
                "<option disabled>No hay tipos de Regions disponibles</option>"
            );
        }
    } catch (error) {
        console.error("Error al cargar los tipos de Regions:", error);
        $("#" + selectElementId)
            .empty()
            .append("<option disabled>Error al cargar tipos de Regions</option>");

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al cargar los tipos de Regions. Inténtelo más tarde.",
        });
    }
}
function DescargaEmpresa() {
    $("#btnDescargar").click(function () {
        let tabla = $("#nombreTabla").val();

        if (!tabla) {
            alert("Ingrese el nombre de la tabla.");
            return;
        }

        $.ajax({
            url: "/Descarga/DescargarDatos",
            type: "GET",
            data: { tabla: tabla },
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    exportToCSV(response.data, tabla);
                } else {
                    alert("Error: " + response.message);
                }
            },
            error: function () {
                alert("Hubo un error.");
            }
        });
    });
}

function exportToCSV(data, tabla) {
    if (data.length === 0) {
        alert("No hay datos.");
        return;
    }

    let csvContent = "";
    let headers = Object.keys(data[0]).join(",") + "\n";
    csvContent += headers;

    data.forEach(row => {
        csvContent += Object.values(row).join(",") + "\n";
    });

    let blob = new Blob([csvContent], { type: "text/xlsx" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${tabla}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
