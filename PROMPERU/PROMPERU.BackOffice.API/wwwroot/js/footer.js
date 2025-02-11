$(document).ready(function () {
  loadListarFooter();
  loadEditarFooter();

});
async function loadListarFooter() {
  try {
    // Realiza la solicitud AJAX de forma asíncrona
    const response = await $.ajax({
      type: "GET",
      url: "/Footer/ListarFooters",
      dataType: "json",
    });

    console.log(response);
      $("#formfooter").empty();

    if (response.success) {
      // Itera sobre los Footers y los agrega al contenedor
      response.footers.forEach((foot) => {
        const sliderCard = createSliderCardFooter(foot); // Usar la función para crear la tarjeta
          $("#formfooter").append(sliderCard);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay Footers disponibles",
        text: response.message || "No se encontraron Footers.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar los sliders",
      text: "Hubo un problema al cargar los Footers. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
// Función que crea el HTML del slider card
function createSliderCardFooter(foot) {
    return `
       <div class="row ">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Nombre </label>
                        <a href="#!" class="icon-link" data-bs-toggle="modal" data-bs-target="#editSliderModal"
                        data-id="${foot.foot_ID}"
                        data-nombre="${foot.foot_Nombre}"
                        data-contacto="${foot.foot_Contacto}"
                        data-urlIconContacto="${foot.foot_UrlIconContacto}"
                        data-ubicacion="${foot.foot_Ubicacion}"
                        data-urlIconUbicacion="${foot.foot_UrlIconUbicacion}"
                        data-urlLogoPrincipal="${foot.foot_UrlLogoPrincipal}"
                        data-urlLogoSecundario="${foot.foot_UrlLogoSecundario}"
                        data-ayuda="${foot.foot_Ayuda}"
                        data-comunicate="${foot.foot_Comunicate}"
                        data-urlIconMensaje="${foot.foot_UrlIconMensaje}"
                        data-urlIconWhatssap="${foot.foot_UrlIconWhatssap}"               
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </a>
                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control " placeholder="${foot.foot_Nombre}" disabled>

                </div>
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Contacto</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control " placeholder="${foot.foot_Contacto}" disabled>

                </div>
            </div>

            <div class="row ">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Ícono de contacto</label>

                    </div>

                    <input name="" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlIconContacto}" disabled>


                </div>
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Ubicación</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_Ubicacion}" disabled>
                </div>


            </div>

            <div class="row">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Ícono de ubicación</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlIconUbicacion}" disabled>
                </div>

                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">URL del logo</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlIconWhatssap}" disabled>
                </div>
            </div>


            <div class="row">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">Ayuda</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control mb-2" placeholder="${foot.foot_Comunicate}" disabled>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_Ayuda}" disabled>
                </div>

                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">URL de íconos footer</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlIconMensaje}" disabled>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">URL de íconos footer</label>

                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlLogoPrincipal}" disabled>

                </div>

                <div class="col-md-6 my-3 ">
                    <div class="d-flex justify-content-between">
                        <label for="${foot.foot_ID}" class="form-label fw-semibold">URL del logo Perú</label>
                    </div>
                    <input type="text" id="${foot.foot_ID}" class="form-control" placeholder="${foot.foot_UrlLogoSecundario}" disabled>
                </div>
            </div>

    `;
}
async function loadCrearFooter() {
  $("#saveCreateSlider").click(async function () {
    const description = $("#createDescription").val();
    const imageUrl = $("#createImageUrl").val();

    if (description && imageUrl) {
      try {
        const response = await $.ajax({
          type: "POST",
          url: "/Footer/InsertarFooter", // URL del controlador para crear el slider
          data: {
            description: description,
            imageUrl: imageUrl,
          },
        });

        handleResponse(response); // Manejo de la respuesta
      } catch (error) {
        handleError(error);
      }
    } else {
      showWarning("Por favor, complete todos los campos");
    }
  });
}
// Manejo de la respuesta exitosa
function handleResponse(response) {
  if (response.success) {
    Swal.fire({
      title: "¡Éxito!",
      text: "Slider creado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.reload(); // Recargar la página o actualizar el contenido
    });
  } else {
    showError("Hubo un error al crear el slider");
  }
}
// Manejo de errores generales
function handleError(error) {
    console.log(error)
  showError("Hubo un error al intentar crear el slider");
}
// Mostrar error en un cuadro de diálogo
function showError(message) {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}
// Mostrar advertencia
function showWarning(message) {
  Swal.fire({
    title: "Advertencia",
    text: message,
    icon: "warning",
    confirmButtonText: "Aceptar",
  });
}

async function loadEditarFooter() {
    $("#editSliderModal").on("show.bs.modal", function (event) {
        // Obtener los datos del botón que activó el modal
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const nombre = button.data("nombre");
        const contacto = button.data("contacto");
        const urlIconContacto = button.data("urliconcontacto");
        const ubicacion = button.data("ubicacion");
        const urlIconUbicacion = button.data("urliconubicacion");
        const urlLogoPrincipal = button.data("urllogoprincipal");
        const urlLogoSecundario = button.data("urllogosecundario");
        const ayuda = button.data("ayuda");
        const comunicate = button.data("comunicate");
        const urlIconMensaje = button.data("urliconmensaje");
        const urlIconWhatssap = button.data("urliconwhatssap");
        console.log(id, nombre, contacto)
    // Asignar los valores al modal
    const modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editNombre").val(nombre);
      modal.find("#editContacto").val(contacto);
      modal.find("#editUrlContacto").val(urlIconContacto); 
      modal.find("#editUbi").val(ubicacion); 
      modal.find("#editUrlUbi").val(urlIconUbicacion);
      modal.find("#editLogoPrincipal").val(urlLogoPrincipal); 
      modal.find("#editLogoSecundario").val(urlLogoSecundario);
      modal.find("#editAyuda").val(ayuda); 
      modal.find("#editComunicate").val(comunicate);
      modal.find("#editUrlMensaje").val(urlIconMensaje); 
      modal.find("#editUrlWhatssap").val(urlIconWhatssap); 
  });

  $("#saveEditSlider").click(async function () {
      const nombre = $("#editNombre").val();
      const contacto = $("#editContacto").val();
      const urlIconContacto = $("#editUrlContacto").val();
      const id = $("#editId").val();
      const ubicacion = $("#editUbi").val();
      const urlIconUbicacion = $("#editUrlUbi").val();
      const urlLogoPrincipal = $("#editLogoPrincipal").val();
      const urlLogoSecundario = $("#editLogoSecundario").val();
      const ayuda = $("#editAyuda").val();
      const comunicate = $("#editComunicate").val();
      const urlIconMensaje = $("#editUrlMensaje").val();
      const urlIconWhatssap = $("#editUrlWhatssap").val();
  

      console.log(id, nombre, contacto)
      if (nombre && contacto && id) {
      try {
        const response = await $.ajax({
          type: "POST",
          url: "/Footer/ActualizarFooter",
          data: {
            id: id,
            nombre: nombre,
              contacto: contacto,
              urlIconContacto: urlIconContacto,
              ubicacion: ubicacion,
              urlIconUbicacion: urlIconUbicacion,         
              urlLogoPrincipal: urlLogoPrincipal,
              urlLogoSecundario: urlLogoSecundario,
              ayuda: ayuda,
              comunicate: comunicate,
              urlIconMensaje: urlIconMensaje,
              urlIconWhatssap: urlIconWhatssap
          },
        });

        handleEditResponse(response);
      } catch (error) {
        handleError(error);
      }
    } else {
      showWarning("Por favor, complete todos los campos antes de continuar.");
    }
  });
}

// Manejo de la respuesta exitosa para la actualización
function handleEditResponse(response) {
  if (response.success) {
    Swal.fire({
      icon: "success",
      title: "¡Actualizado!",
      text: "El slider se ha actualizado exitosamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.reload();
    });
  } else {
    showError("No se pudo actualizar el slider. Inténtelo nuevamente.");
  }
}
async function loadEliminarFooter() {
  $(document).on("click", '[id^="btn-delete-"]', async function () {
    const id = $(this).data("id"); // Obtener el ID del elemento a eliminar
    console.log(`ID a eliminar: ${id}`);

    // Mostrar mensaje de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      // Realizar la eliminación
      try {
        const response = await eliminarFooter(id);
        handleEliminarResponse(response);
      } catch (error) {
        handleError();
      }
    }
  });
}

// Función para eliminar el Footer
async function eliminarFooter(id) {
  return await $.ajax({
    type: "POST",
    url: "/Footer/EliminarFooter", // Ruta del controlador para la eliminación
    data: { id: id },
  });
}

// Manejo de la respuesta de eliminación
function handleEliminarResponse(response) {
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
}
async function loadGuardarOrdenInfo() {
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
        const ordenData = await obtenerOrdenData();
        console.log(ordenData);
        await actualizarOrdenFooter(ordenData);
      } catch (error) {
        handleError();
      }
    }
  });
}

// Obtener los datos de la orden
async function obtenerOrdenData() {
  const Ids = [];
  const Orders = [];
  const Descriptions = [];
  const Urls = [];
  const NewOrders = [];

  $(".btn-link.text-primary").each(function () {
    Ids.push($(this).data("id"));
    Orders.push($(this).data("orden"));
    Descriptions.push($(this).data("description"));
    Urls.push($(this).data("image-url"));
  });

  $(".card").each(function () {
    NewOrders.push($(this).find(".card-number").text().trim());
  });

  const result = Ids.map((id, index) => ({
    id: parseInt(id),
    orden: parseInt(NewOrders[index]),
    description: Descriptions[index].toString(),
    imageUrl: Urls[index].toString(),
  }));

  return result;
}

// Actualizar el orden de los Footers
async function actualizarOrdenFooter(ordenData) {
  const response = await $.ajax({
    url: "/Footer/ActualizarOrdenFooter",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(ordenData),
  });

  handleActualizarResponse(response);
}

// Manejo de la respuesta de actualización
function handleActualizarResponse(response) {
  if (response.success) {
    Swal.fire({
      icon: "success",
      title: "¡Actualizado!",
      text: "El Footer se ha actualizado exitosamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el Footer. Inténtelo nuevamente.",
      confirmButtonText: "Aceptar",
    });
  }
}
