import { fetchData } from "../../../shared/js/apiService.js";

export async function initDataTable(tableId, apiUrl) {
  try {
    const response = await fetchData(apiUrl + "?t=" + Date.now(), "GET");

    if (!response || !response.success) {
      console.error("Error al obtener los datos.");
      emptyData(tableId);
      return;
    }

    const tests = response.tests.sort((a, b) => a.id - b.id);

    $(`#${tableId}`).DataTable({
      destroy: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json",
      },
      data: tests,
      columns: [
        { data: "id", title: "ID" },
        { data: "titulo", title: "Título del Test" },
        {
          data: null,
          title: "Acciones",
          render: function (row) {
            return `
              <button class="btn btn-sm btn-primary editar-btn" data-id="${row.id}">✏️ Editar</button>
              <button class="btn btn-sm btn-danger eliminar-btn" data-id="${row.id}">🗑️ Eliminar</button>
            `;
          },
        },
      ],
      pagingType: "simple_numbers",
      responsive: true,
    });
  } catch (error) {
    console.error("Error al inicializar la tabla:", error);
    emptyData(tableId);
  }
}

function emptyData(tableId) {
  $(`#${tableId}`).html(`
    <div class="alert alert-warning text-center">
      📢 No hay tests disponibles para mostrar.
    </div>
  `);
}

$(document).on("click", ".editar-btn", function () {
  const id = $(this).data("id");
  console.log("Editar ID:", id);
  window.location.href = `/Test/Editar?id=${id}`;
});

$(document).on("click", ".eliminar-btn", async function () {
  console.log("🗑️ Clic en eliminar detectado.");
  const id = $(this).data("id");

  if (!id) {
    console.error("❌ No se encontró ID en el botón.");
    return;
  }

  console.log(`🔍 ID obtenido para eliminación: ${id}`);
  await eliminarRegistro(id);
});

async function eliminarRegistro(id) {
  if (!id) {
    console.error("❌ Error: ID inválido para eliminar.");
    Swal.fire("Error", "No se encontró el ID del test.", "error");
    return;
  }

  const confirmacion = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirmacion.isConfirmed) {
    try {
     
      const response = await fetchData(`/Test/EliminarTest/${id}`, "DELETE");

      if (response && response.success) {
        Swal.fire("Eliminado", "El registro ha sido eliminado", "success");

        setTimeout(() => {
          initDataTable("tableListTest", "/Test/ListarTest?t=" + Date.now());
        }, 500);
      } else {
        console.error("❌ Error en la API:", response);
        Swal.fire(
          "Error",
          response?.message || "No se pudo eliminar el test",
          "error"
        );
      }
    } catch (error) {
      console.error("❌ Error en la solicitud de eliminación:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al eliminar el test. Inténtalo de nuevo.",
        "error"
      );
    }
  }
}

function handleResponse(
  response,
  successMessage = "Operación realizada con éxito"
) {
  if (response && response.success) {
    Swal.fire({
      title: "¡Éxito!",
      text: successMessage,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      location.reload(); // 🔄 Recargar la página o actualizar la tabla
    });
  } else {
    const errorMessage = response?.message || "Ocurrió un error inesperado";
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
}
