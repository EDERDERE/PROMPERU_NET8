$(document).ready(function () {
    let editingUserId = null; // Almacenar el ID del usuario que está siendo editado
    loadListarUsuario();
    loadCrearUsuario();       
    loadEditarUsuario();    
    });

async function loadListarUsuario() {
  try {
    // Realiza la solicitud AJAX de forma asíncrona
    const response = await $.ajax({
      type: "GET",
        url: "/Usuario/ListarUsuarios",
      dataType: "json",
    });

      const tableBody = $('#userList tbody');
      tableBody.empty(); // Limpiar la tabla antes de agregar los usuarios

      if (response.success) {
        console.log(response.usuarios)
      // Itera sobre los banners y los agrega al contenedor
          response.usuarios.forEach((user) => {

              tableBody.append(`
              <tr data-id="${user.usua_ID}">
                <td>${user.usua_ID}</td>
                <td>${user.usua_Usuario}</td>
                <td>${user.usua_Cargo}</td>
                <td>
                  <button class="btn btn-warning btn-edit">Editar</button>                  
                </td>
              </tr>
            `);                 
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay usuarios disponibles",
        text: response.message || "No se encontraron usuarios.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar los usuarios",
      text: "Hubo un problema al cargar los usuarios. Por favor, inténtelo nuevamente más tarde.",
    });
  }
}
async function loadCrearUsuario() {
    // Asignamos el evento submit al formulario
    $('#userForm').on('submit', async function (e) {
        e.preventDefault();  // Evita el envío automático del formulario

        console.log('Ingreso a crear usuario');

        // Obtener valores del formulario
        const usuario = $('#Usua_Usuario').val().trim();
        const contrasenia = $('#Usua_Contrasenia').val().trim();

        if (!usuario || !contrasenia) {
            Swal.fire({
                title: "Advertencia",
                text: "Por favor, complete todos los campos",
                icon: "warning",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        let usuarioExiste = false;
        $('#userList tbody tr').each(function () {
            let nombreExistente = $(this).find('td:eq(1)').text().trim().toLowerCase();
            console.log(`Comparando: '${nombreExistente}' con '${usuario.toLowerCase()}'`);  // Debug

            if (nombreExistente === usuario.toLowerCase()) {
                usuarioExiste = true;
                return false; // Salir del bucle
            }
        });

        console.log('¿Usuario existe?:', usuarioExiste);

        console.log('usuarioExiste:', usuarioExiste);

        if (usuarioExiste) {
            Swal.fire({
                title: "Error",
                text: "El usuario ya existe en la tabla, ingrese otro nombre.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }
           

            try {
                const response = await $.ajax({
                    type: "POST",
                    url: "/Usuario/InsertarUsuario",
                    data: { usuario, contrasenia, cargo: "" },
                    dataType: "json",
                });

                console.log('Respuesta del servidor:', response);

                if (response.success) {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: "Usuario creado exitosamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    }).then(() => {
                        loadListarUsuario();  // Recargar la lista
                        resetForm();  // Limpiar el formulario
                    });
                } else {
                    throw new Error("Hubo un error al intentar crear el usuario.");
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al intentar crear el usuario o no tienes permiso para crear. Inténtelo nuevamente.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
                console.error('Error en la creación del usuario:', error);
            }
        
    });
}

async function loadEditarUsuario() {
    // Evento click para editar usuario
    $(document).on('click', '.btn-edit', async function () {
        const userId = $(this).closest('tr').data('id');

        try {
            const user = await $.ajax({
                url: `/Usuario/ObtenerUsuario/${userId}`, // URL para obtener el usuario
                method: 'GET',
                dataType: 'json'
            });
            console.log(user)
            // Prellenar el formulario con los datos del usuario
            $('#Usua_ID').val(user.usuario.usua_ID);
            $('#Usua_Usuario').val(user.usuario.usua_Usuario);
            $('#Usua_Contrasenia').val(user.usuario.usua_Contrasenia);
            $('#Usua_Cargo').val(user.usuario.usua_Cargo);

            // Guardar ID del usuario en edición
            const editingUserId = user.usuario.usua_ID;

            // Cambiar el botón del formulario a "Actualizar Usuario"
            $('#userForm button').text('Actualizar Usuario');

            console.log(`Editando usuario ID: ${editingUserId}`);

            // Evento submit para actualizar usuario
            $('#userForm').off('submit').on('submit', async function (e) {
                e.preventDefault();

                // Obtener los valores del formulario
                const userData = {
                    id: editingUserId,
                    usuario: $('#Usua_Usuario').val(),
                    contrasenia: $('#Usua_Contrasenia').val(),
                    cargo: $('#Usua_Cargo').val()
                };
                console.log('userData',userData)
                try {
                    const response = await $.ajax({
                        type: "POST",
                        url: `/Usuario/ActualizarUsuario/${editingUserId}`,
                        data: userData,                    
                        dataType: 'json'
                    });

                    if (response.success) {
                        Swal.fire({
                            title: "¡Éxito!",
                            text: "Usuario actualizado exitosamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            loadListarUsuario(); // Refrescar la lista de usuarios
                            resetForm(); // Resetear el formulario
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un error al actualizar el usuario",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error al intentar actualizar el usuario.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                    console.error(error);
                }
            });

        } catch (error) {
            console.error("Error al obtener usuario:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo obtener la información del usuario.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    });
}

function resetForm() {
    $('#Usua_Usuario').val('');
    $('#Usua_Contrasenia').val('');
    $('#Usua_Cargo').val('');
    editingUserId = null;
    $('#userForm button').text('Agregar Usuario');
}