$(document).ready(function () {
  loadListarMenu();
    loadEditarMenu();
    loadGuardarOrdenMenu();

});
async function loadListarMenu() {
  try {
    // Realiza la solicitud AJAX de forma asíncrona
    const response = await $.ajax({
      type: "GET",
      url: "/Login/Login",
      dataType: "json",
    });

    console.log(response);
      $("#sliderContainerMenu").empty();

    if (response.success) {
      // Itera sobre los Menus y los agrega al contenedor
      response.menus.forEach((menu) => {
        const sliderCard = createSliderCardMenu(menu); // Usar la función para crear la tarjeta
          $("#sliderContainerMenu").append(sliderCard);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay Menus disponibles",
        text: response.message || "No se encontraron Menus.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar los sliders",
      text: "Hubo un problema al cargar los Menus. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
// Función que crea el HTML del slider card
function createSliderCardMenu(menu) {
    return `
     <div class="card col-12 col-md-12 shadow border-0 p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="card-number mb-0">${menu.menu_Orden}</h5>
                    <div class="d-flex gap-2">                      
                        <button class="btn btn-link text-primary p-0" data-bs-toggle="modal"
                                data-bs-target="#editSliderModal"
                                data-id="${menu.menu_ID}"
                                data-orden="${menu.menu_Orden}"
                                data-nombre="${menu.menu_Nombre}"
                                data-ruta="${menu.menu_UrlIconBoton}"
                                >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </button>  
                         <div class="sortable-handle d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="${menu.menu_ID}" class="form-label fw-semibold">Nombre Menú</label>
                    <input type="text" id="${menu.menu_ID}" class="form-control" placeholder="${menu.menu_Nombre}" disabled>
                </div>

                <div class="mb-3" style="display:none">
                    <label for="${menu.menu_ID}" class="form-label fw-semibold">Ruta Menú</label>
                    <input type="text" id="${menu.menu_ID}" class="form-control" placeholder="${menu.menu_UrlIconBoton}" disabled>
                </div>


            </div>
    `;
}
async function loadCrearMenu() {
  $("#saveCreateSlider").click(async function () {
    const description = $("#createDescription").val();
    const imageUrl = $("#createImageUrl").val();

    if (description && imageUrl) {
      try {
        const response = await $.ajax({
          type: "POST",
          url: "/Menu/InsertarMenu", // URL del controlador para crear el slider
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

async function loadEditarMenu() {
  $("#editSliderModal").on("show.bs.modal", function (event) {
    // Obtener los datos del botón que activó el modal
    const button = $(event.relatedTarget);
    const id = button.data("id");
    const nombre = button.data("nombre");
    const ruta = button.data("ruta");
    console.log(id,nombre,ruta)
    // Asignar los valores al modal
    const modal = $(this);
    modal.find("#editId").val(id);
    modal.find("#editNombre").val(nombre);
    modal.find("#editRuta").val(ruta); 
  });

  $("#saveEditSlider").click(async function () {
      const nombre = $("#editNombre").val();
      const ruta = $("#editRuta").val();
    const id = $("#editId").val();
      console.log(id, nombre, ruta)
      if (nombre && ruta && id) {
      try {
        const response = await $.ajax({
          type: "POST",
          url: "/Menu/ActualizarMenu",
          data: {
            id: id,
            nombre: nombre,
              urlIconBoton: ruta,
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
async function loadEliminarMenu() {
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
        const response = await eliminarMenu(id);
        handleEliminarResponse(response);
      } catch (error) {
        handleError();
      }
    }
  });
}

// Función para eliminar el Menu
async function eliminarMenu(id) {
  return await $.ajax({
    type: "POST",
    url: "/Menu/EliminarMenu", // Ruta del controlador para la eliminación
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
async function loadGuardarOrdenMenu() {
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
        const ordenData = await obtenerOrdenDataMenu();
        console.log(ordenData);
        await actualizarOrdenMenu(ordenData);
      } catch (error) {
        handleError();
      }
    }
  });
}

// Obtener los datos de la orden
async function obtenerOrdenDataMenu() {
  const Ids = [];
  const Orders = [];
 const Nombres = [];
  const Urls = [];
  const NewOrders = [];

  $(".btn-link.text-primary").each(function () {
    Ids.push($(this).data("id"));
    Orders.push($(this).data("orden"));
    Nombres.push($(this).data("nombre"));
    Urls.push($(this).data("ruta"));
  });

  $(".card").each(function () {
    NewOrders.push($(this).find(".card-number").text().trim());
  });

  const result = Ids.map((id, index) => ({
    id: parseInt(id),
    orden: parseInt(NewOrders[index]),
    nombre: Nombres[index].toString(),
    urlIconBoton: Urls[index].toString(),
  }));

  return result;
}

// Actualizar el orden de los Menus
async function actualizarOrdenMenu(ordenData) {
  const response = await $.ajax({
    url: "/Menu/ActualizarOrdenMenu",
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
      text: "El Menu se ha actualizado exitosamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el Menu. Inténtelo nuevamente.",
      confirmButtonText: "Aceptar",
    });
  }
}
