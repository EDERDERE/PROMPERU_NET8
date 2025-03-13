import { fetchData } from "../../../shared/js/apiService.js";
import { handleResponse } from "../utils/handleResponse.js";

export async function initDataTable(tableId, apiUrl) {
  try {
    const response = await fetchData(apiUrl, "GET");

    if (!response || !response.success) {
      console.error("Error al obtener los datos.");
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
          render: function (data, type, row) {
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
  }
}

$(document).on("click", ".editar-btn", function () {
  const id = $(this).data("id");
  window.location.href = `/Test/Editar?id=${id}`;
});

$(document).on("click", ".eliminar-btn", async function () {
  const id = $(this).data("id");

  if (!id) {
    return;
  }

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
      handleResponse(response, "Test eliminado correctamente", () => {
        initDataTable("tableListTest", "/Test/ListarTest");
      });
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

// async function eliminarRegistro(id) {
//   if (!id) {
//     console.error("❌ Error: ID inválido para eliminar.");
//     Swal.fire("Error", "No se encontró el ID del test.", "error");
//     return;
//   }

//   const confirmacion = await Swal.fire({
//     title: "¿Estás seguro?",
//     text: "Esta acción no se puede deshacer",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Sí, eliminar",
//     cancelButtonText: "Cancelar",
//   });

//   if (confirmacion.isConfirmed) {
//     try {
//       const response = await fetchData(`/Test/EliminarTest/${id}`, "DELETE");

//       if (response && response.success) {
//         Swal.fire("Eliminado", "El registro ha sido eliminado", "success");

//         setTimeout(() => {
//           initDataTable("tableListTest", "/Test/ListarTest");
//         }, 500);
//       } else {
//         console.error("❌ Error en la API:", response);
//         Swal.fire(
//           "Error",
//           response?.message || "No se pudo eliminar el test",
//           "error"
//         );
//       }
//     } catch (error) {
//       console.error("❌ Error en la solicitud de eliminación:", error);
//       Swal.fire(
//         "Error",
//         "Hubo un problema al eliminar el test. Inténtalo de nuevo.",
//         "error"
//       );
//     }
//   }
// }
