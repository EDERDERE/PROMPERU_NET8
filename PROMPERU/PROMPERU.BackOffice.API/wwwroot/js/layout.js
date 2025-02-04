$(document).ready(function () {
  loadMenu();
    setActiveMenuItem();
    loadCerrarSesion();
});
function loadCerrarSesion() {
    $("#btnLogout").click(function () {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se cerrará tu sesión actual.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/Login/CerrarSesion", // Ruta del controlador
                    type: "POST",
                    success: function () {
                        Swal.fire({
                            icon: "success",
                            title: "Sesión cerrada",
                            text: "Tu sesión se ha cerrado correctamente.",
                            confirmButtonText: "OK"
                        }).then(() => {
                            window.location.href = "/Login/Index"; // Redirige al login
                        });
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hubo un problema al cerrar la sesión.",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
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
