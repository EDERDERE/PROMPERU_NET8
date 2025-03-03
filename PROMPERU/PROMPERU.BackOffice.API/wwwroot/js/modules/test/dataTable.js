export function initDataTable(tableId) {
  $(`#${tableId}`).DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json",
    },
    data: [
      { id: 1, test: "test", email: "correo", rol: "Administrador" },
      {
        id: 2,
        test: "María González",
        email: "maria.gonzalez@example.com",
        rol: "Usuario",
      },
      {
        id: 3,
        test: "Carlos Rodríguez",
        email: "carlos.rodriguez@example.com",
        rol: "Editor",
      },
      {
        id: 4,
        test: "Ana López",
        email: "ana.lopez@example.com",
        rol: "Moderador",
      },
      {
        id: 5,
        test: "Pedro Sánchez",
        email: "pedro.sanchez@example.com",
        rol: "Usuario",
      },
    ],
    columns: [
      { data: "id", title: "ID" },
      { data: "test", title: "test" },
      { data: "email", title: "Correo Electrónico" },
      { data: "rol", title: "Rol" },
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

  $(document).on("click", ".editar-btn", function () {
    const id = $(this).data("id");
    console.log("Editar ID:", id);
    window.location.href = `/editar?id=${id}`;
  });

  $(document).on("click", ".eliminar-btn", function () {
    const id = $(this).data("id");
    eliminarRegistro(id);
  });
}

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
