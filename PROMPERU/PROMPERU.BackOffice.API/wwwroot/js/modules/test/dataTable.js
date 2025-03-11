import { fetchData } from "../../../shared/js/apiService.js";


export async function initDataTable(tableId, apiUrl) {
  try {
    const response = await fetchData(apiUrl);

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
  }
}

$(document).on("click", ".editar-btn", function () {
  const id = $(this).data("id");
  console.log("Editar ID:", id);
  window.location.href = `/Test/Editar?id=${id}`;
});

$(document).on("click", ".eliminar-btn", function () {
  const id = $(this).data("id");
  console.log("Eliminar ID:", id);
});

async function eliminarRegistro(id) {
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
      const response = await fetchData(`/api/eliminar/${id}`, "DELETE");
      if (response) {
        Swal.fire("Eliminado", "El registro ha sido eliminado", "success");
        $(`#miTabla`).DataTable().ajax.reload();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }
}
