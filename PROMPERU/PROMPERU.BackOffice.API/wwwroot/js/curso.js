﻿$(document).ready(function () {
  console.log("curso");
  loadListarCursos();
  loadCrearCurso();
  loadEditarCurso();
  loadEliminarCurso();
  loadGuardarOrden();
});

function loadListarCursos() {
  $.ajax({
    type: "GET", // Método GET para obtener los sliders
    url: "/Curso/ListarCursos", // URL del controlador que devuelve la lista de sliders
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Limpia el contenedor de sliders antes de renderizar
      $("#sliderContainer").empty();
      $("#tituloContainer").empty();
      if (response.success) {
        const cursos = response.cursos;
        if (cursos.length > 0) {
          renderTitulo(cursos[0]);
          renderSliders(cursos);
        } else {
          $("#sliderContainer").html(
            "<p>No se encontraron cursos disponibles.</p>"
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "No hay cursos disponibles",
          text: response.message || "No se encontraron cursos.",
        });
      }
    },
    error: function () {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los sliders",
        text: "Hubo un problema al cargar los cursos. Por favor, inténtelo nuevamente más tarde.",
      });
    },
  });
}

function renderTitulo(curso) {
  const tituloCard = `
       <div class="row ">
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="titulo-${curso.curs_ID}" class="form-label fw-semibold">Titulo</label>
                            <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editTitle"
                            data-id="${curso.curs_ID}"
                            data-titulo="${curso.curs_Titulo}"
                            data-nombrebotontitulo="${curso.curs_NombreBotonTitulo}"
                            data-urliconboton="${curso.curs_UrlIconBoton}"
                            data-tituloSeccion="${curso.curs_TituloSeccion}"
                            data-descripcionSeccion="${curso.curs_Descripcion}"
                            data-urlBanner="${curso.curs_UrlImagen}"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </a>
                        </div>
                        <input type="text" id="titulo-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_Titulo}" disabled>

                    </div>
                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="nombreBotonTitulo-${curso.curs_ID}" class="form-label fw-semibold">Nombre del botón</label>                          
                        </div>
                        <input type="text" id="nombreBotonTitulo-${curso.curs_ID}" class="form-control custom-button" placeholder="${curso.curs_NombreBotonTitulo}"
                               disabled>

                    </div>
                </div>

                <div class="row ">

                    <div class="col-md-6 my-3 ">
                        <div class="d-flex justify-content-between">
                            <label for="urliconBoton-${curso.curs_ID}" class="form-label fw-semibold">URL ícono de botón</label>                        
                        </div>
                        <input type="text" id="urliconBoton-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_UrlIconBoton}" disabled>

                    </div>
                </div>
                            <hr>

            <div class="row">
              <div class="col-md-6 my-3 ">
                <div class="d-flex justify-content-between">
                  <label for="titulo-seccion-${curso.curs_ID}" class="form-label fw-semibold">Titulo de la seccion</label>

                </div>
                <input type="text" id="titulo-seccion-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_TituloSeccion}" disabled>

              </div>

              <div class="col-md-6 my-3 ">
                <div class="d-flex justify-content-between">
                  <label for="descripcion-banner-${curso.curs_ID}" class="form-label fw-semibold">Descripción del banner</label>

                </div>
                <textarea id="descripcion-banner-${curso.curs_ID}" class="form-control" rows="3" placeholder="${curso.curs_Descripcion}"
                  disabled></textarea>

              </div>

              <div class="col-md-6 my-3 ">
                <div class="d-flex justify-content-between">
                  <label for="url-image-${curso.curs_ID}" class="form-label fw-semibold">URL del banner</label>

                </div>
                <input type="text" id="url-image-${curso.curs_ID}" class="form-control" placeholder="${curso.curs_UrlImagen}" disabled>

              </div>
            </div>
                `;
  $("#tituloContainer").append(tituloCard);
}

function renderSliders(cursos) {
  let slidersHTML = "";

  cursos.forEach((curso) => {
    if (curso.curs_Orden > 0) {
      slidersHTML += `
            <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${curso.curs_Orden}</h5>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link text-danger p-0" 
                         data-id="${curso.curs_ID}"   
                          id="btn-delete-${curso.curs_ID}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${curso.curs_ID}"     
                                data-orden="${curso.curs_Orden}" 
                            data-nombrecurso="${curso.curs_NombreCurso}"
                            data-objetivo="${curso.curs_Objetivo}"
                            data-description="${curso.curs_Descripcion}"
                            data-fechaInicio="${formatearFechaInversa(
                              curso.curs_FechaInicio
                            )}"
                            data-fechaFin="${formatearFechaInversa(
                              curso.curs_FechaFin
                            )}"
                            data-modalidad="${curso.curs_Modalidad}"
                            data-urlimagen="${curso.curs_UrlImagen}"
                            data-nombreboton="${curso.curs_NombreBoton}"
                            data-urlicon="${curso.curs_UrlIcon}"
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
                    <label for="nombreCurso-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Curso</label>
                    <input type="text" id="nombreCurso-${
                      curso.curs_ID
                    }" class="form-control" placeholder="${
        curso.curs_NombreCurso
      }" disabled>
                </div>

                <div class="mb-3">
                    <label for="objetivo-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Objetivo del curso</label>
                    <input type="text" id="objetivo-${
                      curso.curs_ID
                    }" class="form-control" placeholder="${curso.curs_Objetivo}"
                           disabled>
                </div>

                <div class="mb-3">
                    <label for="description-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Logros esperados</label>
                    <textarea id="description-${
                      curso.curs_ID
                    }" class="form-control" rows="3" placeholder="${
        curso.curs_Descripcion
      }"
                              disabled></textarea>
                </div>

                   <div class="mb-3">
                    <label for="fechaInicio-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Fecha Inicio</label>
                    <input type="text" id="fechaInicio-${
                      curso.curs_ID
                    }" class="form-control" value="${formatearFecha(
        curso.curs_FechaInicio
      )}" disabled>
                </div>

                <div class="mb-3">
                    <label for="fechaFin-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Fecha Fin</label>
                    <input type="text" id="fechaFin-${
                      curso.curs_ID
                    }" class="form-control" placeholder="${formatearFecha(
        curso.curs_FechaFin
      )}" disabled>
                </div>

              

                <div class="mb-3">
                    <label for="modalidad-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Modalidad</label>
                    <select class="form-select" id="modalidad-${
                      curso.curs_ID
                    }" disabled>
                        <option value="${curso.curs_ID}">${
        curso.curs_Modalidad
      }</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="urlImagen-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">URL de la imagen</label>
                    <input type="text" id="urlImagen-${
                      curso.curs_ID
                    }" class="form-control" placeholder="${
        curso.curs_UrlImagen
      }" disabled>
                </div>
                <div class="mb-3">
                    <label for="nombreBoton-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">Nombre del botón</label>
                    <input type="text" id="nombreBoton-${
                      curso.curs_ID
                    }" class="form-control custom-button"
                           placeholder="${curso.curs_NombreBoton}" disabled>
                </div>

                <div class="mb-3">
                    <label for="urlIcon-${
                      curso.curs_ID
                    }" class="form-label fw-semibold">URL icono de boton</label>
                    <input type="text" id="urlIcon-${
                      curso.curs_ID
                    }" class="form-control" placeholder="urlIcon-${
        curso.curs_UrlIcon
      }" disabled>
                </div>

            </div>
                              `;
    }
  });

  $("#sliderContainer").append(slidersHTML);
}

function loadCrearCurso() {
  $("#saveCreateSlider").click(function () {
    // Recopilar datos del formulario
    const cursoData = {
      nombreCurso: $("#createCurso").val(),
      objetivo: $("#createObjetivo").val(),
      description: $("#createDescription").val(),
      fechaInicio: $("#createFechaInicial").val(),
      fechaFin: $("#createFechaFinal").val(),
      modalidad: $("#createModalidad").val(),
      urlImagen: $("#createUrlImagen").val(),
      nombreBoton: $("#createNombreBoton").val(),
      urlIcon: $("#createUrlIconBoton").val(),
    };

    // Validar si todos los campos están completos
    if (Object.values(cursoData).some((value) => !value.trim())) {
      Swal.fire({
        title: "Advertencia",
        text: "Por favor, complete todos los campos obligatorios.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Enviar datos al servidor
    $.ajax({
      type: "POST",
      url: "/Curso/InsertarCurso", // URL del controlador para crear el curso
      data: cursoData,
      success: function (response) {
        if (response.success) {
          Swal.fire({
            title: "¡Éxito!",
            text: "Curso creado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            location.reload(); // Recargar la página para reflejar los cambios
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.message || "Hubo un error al crear el curso.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("Error al intentar crear el curso:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      },
    });
  });
}

function loadEditarCurso() {
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

  const handleAjaxRequest = (url, data, successMessage, errorMessage) => {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (response) {
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

  $("#editTitle").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    const modalData = {
      editIdTitulo: button.data("id"),
      editTitulo: button.data("titulo"),
      editNombreBotonTitulo: button.data("nombrebotontitulo"),
      editUrlBoton: button.data("urliconboton"),

      editTituloSeccion: button.data("tituloseccion"),
      editDescripcionSeccion: button.data("descripcionseccion"),
      editUrlBanner: button.data("urlbanner"),
    };

    console.log(modalData);
    assignModalValues($(this), modalData);
  });

  $("#saveEditTitulo").click(function () {
    const data = {
      id: $("#editIdTitulo").val(),
      titulo: $("#editTitulo").val(),
      nombreBotonTitulo: $("#editNombreBotonTitulo").val(),
      urlIconBoton: $("#editUrlBoton").val(),
      fechaInicio: null,
      fechaFin: null,
      tituloSeccion: $("#editTituloSeccion").val(),
      description: $("#editDescripcionSeccion").val(),
      urlImagen: $("#editUrlBanner").val(),
    };

    console.log(data);
    if (data.titulo && data.nombreBotonTitulo && data.urlIconBoton) {
      handleAjaxRequest(
        "/Curso/ActualizarCurso",
        data,
        "El Curso se ha actualizado exitosamente.",
        "No se pudo actualizar el Curso."
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
      editNombreCurso: button.data("nombrecurso"),
      editObjetivo: button.data("objetivo"),
      editDescription: button.data("description"),
      editFechaInicio: button.data("fechainicio"),
      editFechaFin: button.data("fechafin"),
      editModalidad: button.data("modalidad"),
      editUrlImagen: button.data("urlimagen"),
      editNombreBoton: button.data("nombreboton"),
      editUrlIcon: button.data("urlicon"),
    };
    assignModalValues($(this), modalData);
  });

  $("#saveEditSlider").click(function () {
    const data = {
      id: $("#editId").val(),
      orden: $("#editOrder").val(),
      nombreCurso: $("#editNombreCurso").val(),
      objetivo: $("#editObjetivo").val(),
      description: $("#editDescription").val(),
      fechaInicio: $("#editFechaInicio").val(),
      fechaFin: $("#editFechaFin").val(),
      modalidad: $("#editModalidad").val(),
      urlImagen: $("#editUrlImagen").val(),
      nombreBoton: $("#editNombreBoton").val(),
      urlIcon: $("#editUrlIcon").val(),
    };

    if (Object.values(data).every((value) => value)) {
      handleAjaxRequest(
        "/Curso/ActualizarCurso",
        data,
        "El Curso se ha actualizado exitosamente.",
        "No se pudo actualizar el Curso."
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

function loadEliminarCurso() {
  // Función para mostrar alertas de éxito o error
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

  // Función para realizar la eliminación a través de AJAX
  const eliminarCurso = (id) => {
    $.ajax({
      type: "POST",
      url: "/Curso/EliminarCurso", // Ruta del controlador para la eliminación
      data: { id: id },
      success: function (response) {
        if (response.success) {
          showAlert(
            "success",
            "¡Eliminado!",
            "El curso ha sido eliminado con éxito.",
            () => {
              location.reload(); // Recargar la página o actualizar el contenido dinámicamente
            }
          );
        } else {
          showAlert(
            "error",
            "Error",
            "No se pudo eliminar el curso. Inténtalo de nuevo."
          );
        }
      },
      error: function () {
        showAlert(
          "error",
          "Error",
          "Hubo un error en el servidor al intentar eliminar el curso."
        );
      },
    });
  };

  // Capturar clics en los botones de eliminación
  $(document).on("click", '[id^="btn-delete-"]', function () {
    const id = $(this).data("id"); // Obtener el ID del curso a eliminar
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
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCurso(id); // Llamar a la función para eliminar el curso
      }
    });
  });
}

function loadGuardarOrden() {
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
      NombreCursos: [],
      Objetivos: [],
      Descriptions: [],
      FechaInicios: [],
      FechaFinales: [],
      Modalidades: [],
      UrlImagenes: [],
      NombreBotones: [],
      UrlIcons: [],
      NewOrders: [],
    };

    $(".btn-link.text-primary").each(function () {
      data.Ids.push($(this).data("id"));
      data.Orders.push($(this).data("orden"));
      data.NombreCursos.push($(this).data("nombrecurso"));
      data.Objetivos.push($(this).data("objetivo"));
      data.Descriptions.push($(this).data("description"));
      data.FechaInicios.push($(this).data("fechainicio"));
      data.FechaFinales.push($(this).data("fechafin"));
      data.Modalidades.push($(this).data("modalidad"));
      data.UrlImagenes.push($(this).data("urlimagen"));
      data.NombreBotones.push($(this).data("nombreboton"));
      data.UrlIcons.push($(this).data("urlicon"));
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
      nombreCurso: data.NombreCursos[index].toString(),
      objetivo: data.Objetivos[index].toString(),
      description: data.Descriptions[index].toString(),
      modalidad: data.Modalidades[index].toString(),
      fechaInicio: data.FechaInicios[index].toString(),
      fechaFin: data.FechaFinales[index].toString(),
      nombreBoton: data.NombreBotones[index].toString(),
      UrlIcon: data.UrlIcons[index].toString(),
      UrlImagen: data.UrlImagenes[index].toString(),
    }));
  };

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
        console.log("guardar orden");

        // Obtener los datos de las cards
        const data = obtenerDatosCards();
        const resultData = estructurarDatos(data);

        // Mostrar el resultado en consola (o lo que necesites hacer con los datos)
        console.log(resultData);
        console.log(JSON.stringify(resultData));

        // Realizar la solicitud AJAX para actualizar la orden
        $.ajax({
          url: "/Curso/ActualizarOrdenCurso",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(resultData),
          success: function (response) {
            if (response.success) {
              showAlert(
                "success",
                "¡Actualizado!",
                "El curso se ha actualizado exitosamente.",
                () => {
                  location.reload(); // Recargar la página o actualizar el contenido
                }
              );
            } else {
              showAlert(
                "error",
                "Error",
                "No se pudo actualizar el curso. Inténtelo nuevamente."
              );
            }
          },
          error: function (xhr, status, error) {
            showAlert(
              "error",
              "Error",
              "Hubo un error al intentar actualizar el curso."
            );
          },
        });
      }
    });
  });
}

// Función para formatear la fecha
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0"); // Día con dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
  const anio = fecha.getFullYear(); // Año completo

  return `${dia}/${mes}/${anio}`; // Cambia el formato según sea necesario
}
function formatearFechaInversa(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0"); // Día con dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
  const anio = fecha.getFullYear(); // Año completo

  return `${anio}-${mes}-${dia}`; // Cambia el formato según sea necesario
}
