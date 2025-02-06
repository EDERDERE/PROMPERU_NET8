$(document).ready(function () {
  loadMenu();
    setActiveMenuItem();
    loadCerrarSesion();
});
// Función reutilizable para mostrar alertas con SweetAlert
async function mostrarAlerta(icono, titulo, mensaje, confirmButtonText = 'OK', callback = null) {
    const result = await Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
        confirmButtonText: confirmButtonText
    });

    // Ejecutar callback si está definido
    if (result.isConfirmed && callback) {
        callback();
    }
}

// Función para manejar el cierre de sesión
async function loadCerrarSesion() {
    $("#btnLogout").click(async function () {
        console.log('Ingresando a cerrar sesión');

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Se cerrará tu sesión actual.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar"
        });

        // Si el usuario confirma el cierre de sesión
        if (result.isConfirmed) {
            try {
                // Realizar la petición AJAX para cerrar sesión
                await $.ajax({
                    url: "/Login/CerrarSesion", // Ruta del controlador
                    type: "POST"
                });

                // Mostrar alerta de éxito y redirigir
                await mostrarAlerta(
                    "success",
                    "Sesión cerrada",
                    "Tu sesión se ha cerrado correctamente.",
                    "OK",
                    () => window.location.href = "/Login/Index" // Redirigir al login
                );
            } catch (error) {
                // Si ocurre un error al cerrar la sesión
                await mostrarAlerta(
                    "error",
                    "Error",
                    "Hubo un problema al cerrar la sesión.",
                    "OK"
                );
            }
        }
    });
}



function loadMenu() {
  const menu = document.querySelectorAll(".menu");
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  menu.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
}

function setActiveMenuItem() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".sidebar .menu-item a");

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (currentPath === linkPath) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
}
