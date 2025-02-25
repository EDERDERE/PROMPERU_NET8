$(document).ready(() => {
    Promise.all([loadValidarUsuario(), loadForgotPasswordLink(), loadLogo()]);
});

function loadValidarUsuario() {
    $('#loginForm').submit(async function (e) {
        e.preventDefault();

        let usuario = $('#usuario').val().trim();
        let password = $('#password').val().trim();

        if (!usuario || !password) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: usuario ? 'Por favor, ingrese la contraseña.' : 'Por favor, ingrese el usuario.',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await $.post('/Login/Login', { usuario, contrasenia: password });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de sesión exitoso!',
                    text: 'Redirigiendo...',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = response.redirectUrl;
                });
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: response.message });
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'
            });
        }
    });
}

function loadForgotPasswordLink() {
    $("#forgotPasswordLink").click(event => {
        event.preventDefault();
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
        const response = await $.getJSON("/Login/ListarLogos");

        if (response.success && response.logos.length) {
            $("#logoHome").html(response.logos.map(renderLogo).join(''));
        } else {
            Swal.fire({
                icon: "error",
                title: "No hay logos disponibles",
                text: response.message || "No se encontraron logos.",
            });
        }
    } catch {
        Swal.fire({
            icon: "error",
            title: "Error al cargar los logos",
            text: "Hubo un problema al cargar los logos. Por favor, inténtelo nuevamente más tarde.",
        });
    }
}

function renderLogo(data) {
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
