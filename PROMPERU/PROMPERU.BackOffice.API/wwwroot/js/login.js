$(document).ready(function () {
    loadValidarUsuario();  
    loadForgotPasswordLink();
    loadLogo();
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
async function loadLogo() {
    try {
        // Realiza la solicitud AJAX de forma asíncrona
        const response = await $.ajax({
            type: "GET",
            url: "/Login/ListarLogos",
            dataType: "json",
        });

        console.log('response',response);
        $("#logoHome").empty();

        if (response.success) {
            // Itera sobre los Menus y los agrega al contenedor
            response.logos.forEach((logo) => {
                const html = renderLogo(logo); // Usar la función para crear la tarjeta
                $("#logoHome").append(html);
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

function renderLogo(data){
    console.log(data)
    return `
      <div class="d-flex align-items-center gap-2">
        <img src="${data.logo_UrlPrincipal}" alt="Logo Superior" class="logo-header"/>
        <span class="separator mx-2 text-white">|</span>
        <img src="${data.logo_UrlSecundario}" alt="Logo Inferior" class="logo-header"/>
      </div>
      <button class="btn btn-transparent d-block d-lg-none text-white" id="openMenu" onclick="openMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>     
    `;    
}