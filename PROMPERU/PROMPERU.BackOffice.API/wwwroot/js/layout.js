$(document).ready(function () {
    loadLogo();
  loadMenu();
  setActiveMenuItem();
  loadCerrarSesion();
    setActiveMainButtons();
    
});

async function mostrarAlerta(
  icono,
  titulo,
  mensaje,
  confirmButtonText = "OK",
  callback = null
) {
  const result = await Swal.fire({
    icon: icono,
    title: titulo,
    text: mensaje,
    confirmButtonText: confirmButtonText,
  });

  // Ejecutar callback si está definido
  if (result.isConfirmed && callback) {
    callback();
  }
}

// Función para manejar el cierre de sesión
async function loadCerrarSesion() {
  $("#btnLogout").click(async function () {
    console.log("Ingresando a cerrar sesión");

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario confirma el cierre de sesión
    if (result.isConfirmed) {
      try {
        // Realizar la petición AJAX para cerrar sesión
        await $.ajax({
          url: "/Login/CerrarSesion", // Ruta del controlador
          type: "POST",
        });

        // Mostrar alerta de éxito y redirigir
        await mostrarAlerta(
          "success",
          "Sesión cerrada",
          "Tu sesión se ha cerrado correctamente.",
          "OK",
          () => (window.location.href = "/Login/Index") // Redirigir al login
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
function setActiveMainButtons() {
  const currentPath = window.location.pathname.toLowerCase();


  const sections = {
    "#my-home": [
      "/banner",
      "/informacion",
      "/requisito",
      "/inscripcion",
      "/curso",
      "/beneficio",
      "/caso",
      "/contacto",
      "/empresa",
      "/perfilEmpresarial",
      "/testimonio",
    ],
    "#config": ["/logo", "/menu", "/logro", "/footer"],
  };

  const menuItems = document.querySelectorAll(".sidebar .menu-item");

  menuItems.forEach((menuItem) => {
    const button = menuItem.querySelector("button");
    if (!button) return;

    const targetId = button.getAttribute("data-bs-target");

    if (targetId && sections[targetId]) {
      let isActive = sections[targetId].some((route) =>
        currentPath.includes(route)
      );

      if (isActive) {
        menuItem.classList.add("active");
      } else {
        menuItem.classList.remove("active");
      }
    }
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
async function loadLogo() {
    try {
        // Realiza la solicitud AJAX de forma asíncrona
        const response = await $.ajax({
            type: "GET",
            url: "/Login/ListarLogos",
            dataType: "json",
        });

        console.log('response', response);
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

function renderLogo(data) {
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