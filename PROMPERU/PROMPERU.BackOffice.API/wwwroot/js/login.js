$(document).ready(function () {
    loadValidarUsuario();  
    loadForgotPasswordLink();
});

async function loadValidarUsuario() {
    // Configurar el evento de envío del formulario con un manejo personalizado
    $('#loginForm').submit(async function (e) {
        e.preventDefault();  // Evita el envío por defecto del formulario

        // Capturar los valores ingresados en los campos de usuario y contraseña
        var usuario = $('#usuario').val();
        var password = $('#password').val();

        // Validaciones previas para asegurar que ambos campos sean ingresados
        if (usuario === "" && password === "") {
            await Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese ambos campos.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (usuario === "" && password !== "") {
            await Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese el usuario.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (usuario !== "" && password === "") {
            await Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese la contraseña.',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Realizar la solicitud AJAX de manera asíncrona
        try {
            const response = await $.ajax({
                url: '/Login/Login',  // URL del controlador encargado del inicio de sesión
                type: 'POST',
                data: {
                    usuario: usuario,
                    contrasenia: password
                }
            });

            // Verificar si la autenticación fue exitosa
            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de sesión exitoso!',
                    text: 'Redirigiendo...',
                    timer: 2000,  // Mostrar la alerta por 2 segundos
                    showConfirmButton: false
                });
                window.location.href = response.redirectUrl; // Redirigir al usuario
            } else {
                // Mostrar mensaje de error si la autenticación falla
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        } catch (error) {
            // Manejar errores en la solicitud AJAX
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'
            });
        }
    });
}

function loadForgotPasswordLink(){
    $("#forgotPasswordLink").click(function (event) {
        event.preventDefault(); // Evita la navegación por defecto  
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, comunícate con el administrador para restablecer tu contraseña.',
            confirmButtonText: 'OK'
        });
    });
}
