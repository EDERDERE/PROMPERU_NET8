$(document).ready(function () {
    loadValidarUsuario();  
    loadForgotPasswordLink();
});

function loadValidarUsuario() {
    // Cuando el formulario se envíe, hacemos un manejo personalizado
    $('#loginForm').submit(function (e) {
        e.preventDefault();  // Evitar el comportamiento por defecto del formulario

        // Obtener los valores de usuario y contraseña
        var usuario = $('#usuario').val();
        var password = $('#password').val();

        // Validar los campos antes de enviar
        if (usuario === "" && password === "") {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese ambos campos.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (usuario === "" && password !== "") {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese el usuario.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (usuario !== "" && password === "") {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, ingrese el password.',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Realizar la petición AJAX
        $.ajax({
            url: '/Login/Login',  // Ruta al método del controlador
            type: 'POST',
            data: {
                usuario: usuario,
                contrasenia: password
            },
            success: function (response) {
                console.log(response)
                 if (response.success) {                 
                     Swal.fire({
                         icon: 'success',
                         title: '¡Inicio de sesión exitoso!',
                         text: 'Redirigiendo...',
                         timer: 2000,
                         showConfirmButton: false
                     }).then(() => {
                         window.location.href = response.redirectUrl;
                     });
                 } else {
                     Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: response.message
                     });
                 }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'
                });
            }
        });
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
