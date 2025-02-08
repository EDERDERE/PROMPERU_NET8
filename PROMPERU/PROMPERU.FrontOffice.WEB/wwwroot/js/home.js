$(document).ready(function () {
  home.loadListarLogos();
  home.loadListarMenus();
  home.loadListarCursos();
  home.loadListarInformacion();
  home.loadListarRequisitos();
  home.loadListarBeneficios();
  home.loadListarCasos();
  home.loadListarBanners();
  home.loadListarInscripcions();
  home.loadListarLogros();
  home.loadListarTestimonios();
  home.loadListarPerfilEmpresarials();
  home.loadListarFormularioContactos();
  home.loadListarEmpresaGraduadas();
  home.loadListarFooters();
});

const home = {
  loadListarLogos: function () {
    $.ajax({
      type: "GET",
      url: "/Logo/ListarLogos",
      dataType: "json",
      success: function ({ success, logos, message }) {
        console.log("Respuesta de logos:", logos);

        // Limpiar el contenedor de logos antes de renderizar
        const $logoHome = $("#logoHome");
        $logoHome.empty();

        if (success) {
          if (logos.length > 0) {
            // Renderizar el primer logo disponible
            renderLogoHome(logos[0]);
          } else {
            // Si no hay logos, mostrar un mensaje adecuado
            $logoHome.html("<p>No hay información de logos disponibles.</p>");
          }
        } else {
          // Mostrar alerta de error si no hay logos disponibles
          Swal.fire({
            icon: "error",
            title: "No hay logos disponibles",
            text: message || "No se encontraron logos.",
          });
        }
      },
      error: function (xhr, status, error) {
        // Manejo de errores con m�s detalles
        Swal.fire({
          icon: "error",
          title: "Error al cargar los logos",
          text: `Hubo un problema al cargar los logos. Error: ${error}. Por favor, int�ntelo nuevamente m�s tarde.`,
        });
        console.error("Error al cargar los logos:", status, error);
      },
    });
  },
  loadListarMenus: function () {
    $.ajax({
      type: "GET",
      url: "/Menu/ListarMenus",
      dataType: "json",
      success: function ({ success, menus, message }) {
        console.log("Respuesta de men�s:", menus);

        // Limpiar el contenedor de men�s antes de renderizar
        const $menuHome = $("#menuHome");
        $menuHome.empty();

        if (success) {
          if (menus.length > 0) {
            // Renderizar los men�s si hay disponibles
            renderMenuHome(menus);
          } else {
            // Si no hay men�s, mostrar un mensaje adecuado
            $menuHome.html("<p>No hay información de men�s disponibles.</p>");
          }
        } else {
          // Mostrar alerta de error si no hay men�s disponibles
          Swal.fire({
            icon: "error",
            title: "No hay men�s disponibles",
            text: message || "No se encontraron men�s.",
          });
        }
      },
      error: function (xhr, status, error) {
        // Manejo de errores con m�s detalles
        Swal.fire({
          icon: "error",
          title: "Error al cargar los men�s",
          text: `Hubo un problema al cargar los men�s. Error: ${error}. Por favor, int�ntelo nuevamente m�s tarde.`,
        });
        console.error("Error al cargar los men�s:", status, error);
      },
    });
  },
  loadListarLogros: function () {
    $.ajax({
      type: "GET",
      url: "/Logro/ListarLogros",
      dataType: "json",
      success: function ({ success, logros, message }) {
        console.log("Respuesta de logros:", logros);

        // Limpiar el contenedor de logros antes de renderizar
        const $logrosHome = $("#logrosHome");
        $logrosHome.empty();

        if (success) {
          if (logros.length > 0) {
            // Renderizar los logros si hay disponibles
            renderLogrosHome(logros);
          } else {
            // Si no hay logros, mostrar un mensaje adecuado
            $logrosHome.html(
              "<p>No hay información de logros disponibles.</p>"
            );
          }
        } else {
          // Mostrar alerta de error si no se encuentran logros
          Swal.fire({
            icon: "error",
            title: "No hay logros disponibles",
            text: message || "No se encontraron logros.",
          });
        }
      },
      error: function (xhr, status, error) {
        // Manejo de errores con m�s detalles
        Swal.fire({
          icon: "error",
          title: "Error al cargar los logros",
          text: `Hubo un problema al cargar los logros. Error: ${error}. Por favor, int�ntelo nuevamente m�s tarde.`,
        });
        console.error("Error al cargar los logros:", status, error);
      },
    });
  },
  loadListarTestimonios: function () {
    $.ajax({
      type: "GET",
      url: "/Testimonio/ListarTestimonios",
      dataType: "json",
      success: function ({ success, testimonios, message }) {
        console.log("Respuesta de testimonios:", testimonios);

        // Limpiar los contenedores antes de renderizar
        const $tituloTestHome = $("#tituloTestHome");
        const $slideTestHome = $("#slideTestHome");
        $tituloTestHome.empty();
        $slideTestHome.empty();

        if (success) {
          if (testimonios.length > 0) {
            // Renderizar el titulo y el slide de los testimonios
            renderTituloTestHome(testimonios[0]);
            renderSlideTestHome(testimonios);
          } else {
            // Si no hay testimonios, mostrar un mensaje adecuado
            $slideTestHome.html(
              "<p>No hay información de testimonios disponibles.</p>"
            );
          }
        } else {
          // Mostrar alerta si no se encuentran testimonios
          Swal.fire({
            icon: "error",
            title: "No hay testimonios disponibles",
            text: message || "No se encontraron testimonios.",
          });
        }
      },
      error: function (xhr, status, error) {
        // Manejo de errores con m�s detalles
        Swal.fire({
          icon: "error",
          title: "Error al cargar los testimonios",
          text: `Hubo un problema al cargar los testimonios. Error: ${error}. Por favor, int�ntelo nuevamente m�s tarde.`,
        });
        console.error("Error al cargar los testimonios:", status, error);
      },
    });
  },
  loadListarPerfilEmpresarials: function () {
    $.ajax({
      type: "GET",
      url: "/PerfilEmpresarial/ListarPerfilEmpresarials",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);
        $("#tituloPEmpHome").empty();
        $("#sliderPEmpHome").empty();

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay información disponible",
            text: response?.message || "No se encontraron registros.",
          });
          return;
        }

        const perfilEmpresarials = response.perfilEmpresarials || [];

        if (perfilEmpresarials.length > 0) {
          renderTituloPEmpHome(perfilEmpresarials[0]); // Renderiza el t�tulo con el primer elemento
          renderSlidePEmpHome(perfilEmpresarials); // Renderiza los sliders
        } else {
          $("#sliderPEmpHome").html(
            "<p>No hay información de testimonios disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error); // Log en consola para debugging

        Swal.fire({
          icon: "error",
          title: "Error al cargar los perfiles",
          text: "Hubo un problema al cargar la información. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarFormularioContactos: function () {
    $.ajax({
      type: "GET",
      url: "/FormularioContacto/ListarFormularioContactos",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);
        $("#contactoHome").empty(); // Limpia el contenedor antes de renderizar

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay información disponible",
            text: response?.message || "No se encontraron registros.",
          });
          return;
        }

        const formularioContactos = response.formularioContactos || [];

        if (formularioContactos.length > 0) {
          renderContactoHome(formularioContactos[0]); // Renderiza el primer contacto
        } else {
          $("#contactoHome").html(
            "<p>No hay información de contacto disponible.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error); // Log en consola para debugging

        Swal.fire({
          icon: "error",
          title: "Error al cargar la información",
          text: "Hubo un problema al cargar los datos de contacto. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarEmpresaGraduadas: function () {
    $.ajax({
      type: "GET",
      url: "/Empresa/ListarEmpresas",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);
        // Limpia los contenedores antes de renderizar
        $("#tituloEGHome, #sliderEGHome, #botonEGHome").empty();

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay empresas disponibles",
            text: response?.message || "No se encontraron registros.",
          });
          return;
        }

        const empresas = response.empresas || [];

        if (empresas.length > 0) {
          renderTituloEGHome(empresas[0]);
          renderBotonEGHome(empresas[0]);
          renderSliderEGHome(empresas);
        } else {
          $("#sliderEGHome").html(
            "<p>No hay información de empresas disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error); // Log para debugging

        Swal.fire({
          icon: "error",
          title: "Error al cargar las empresas",
          text: "Hubo un problema al obtener la información. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarInformacion: function () {
    $.ajax({
      type: "GET",
      url: "/Informacion/ListarInformacions",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        // Limpia el contenedor antes de renderizar
        $("#seccionHome").empty();

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay información disponible",
            text: response?.message || "No se encontraron registros.",
          });
          return;
        }

        const informacions = response.informacions || [];

        if (informacions.length > 0) {
          renderSeccionHome(informacions[0]);
        } else {
          $("#seccionHome").html("<p>No hay información disponible.</p>");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar la información",
          text: "Hubo un problema al obtener la información. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarCursos: function () {
    $.ajax({
      type: "GET",
      url: "/Curso/ListarCursos",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay cursos disponibles",
            text: response?.message || "No se encontraron cursos.",
          });
          return;
        }

        const cursos = response.cursos || [];

        // Limpia los contenedores antes de renderizar
        $("#tituloCursoHome, #botonCursoHome, #sliderCursoHome").empty();

        if (cursos.length > 0) {
          renderTituloCursoHome(cursos[0]);
          renderBotonCursoHome(cursos[0]);
          renderSliderCursoHome(cursos);
        } else {
          $("#sliderCursoHome").html(
            "<p>No se encontraron cursos disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar los cursos",
          text: "Hubo un problema al obtener los cursos. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarRequisitos: function () {
    $.ajax({
      type: "GET",
      url: "/Requisito/ListarRequisitos",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay requisitos disponibles",
            text: response?.message || "No se encontraron requisitos.",
          });
          return;
        }

        const requisitos = response.requisitos || [];

        // Limpia los contenedores antes de renderizar
        $("#tituloRequisitoHome, #sliderRequisitoHome").empty();

        if (requisitos.length > 0) {
          renderTituloRequisitoHome(requisitos[0]); // Se corrigi� el typo en la funci�n
          renderSliderRequisitoHome(requisitos);
        } else {
          $("#sliderRequisitoHome").html(
            "<p>No se encontraron requisitos disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar los requisitos",
          text: "Hubo un problema al obtener los requisitos. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarBeneficios: function () {
    $.ajax({
      type: "GET", // M�todo GET para obtener los sliders
      url: "/Beneficio/ListarBeneficios", // URL del controlador que devuelve la lista de sliders
      dataType: "json",
      success: function (response) {
        console.log(response);
        // Limpia el contenedor de sliders antes de renderizar
        $("#tituloBeneficioHome").empty();
        $("#sliderBeneficioHome").empty();
        $("#portadaBeneficioHome").empty();
        if (response.success) {
          const beneficios = response.beneficios;
          console.log("beneficios", beneficios);
          if (beneficios.length > 0) {
            renderTituloBeneficioHome(beneficios[0]);
            renderPortadaBeneficioHome(beneficios[0]);
            renderSliderBeneficioHome(beneficios);
          } else {
            $("#sliderBeneficioHome").html(
              "<p>No se encontraron requisitos disponibles.</p>"
            );
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "No hay banners disponibles",
            text: response.message || "No se encontraron banners.",
          });
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Error al cargar los sliders",
          text: "Hubo un problema al cargar los banners. Por favor, int�ntelo nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarCasos: function () {
    $.ajax({
      type: "GET",
      url: "/Caso/ListarCasos",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay casos disponibles",
            text: response?.message || "No se encontraron casos.",
          });
          return;
        }

        const casos = response.casos || [];

        // Limpia los contenedores antes de renderizar
        $(
          "#tituloCasoHome, #sliderCasoHome, #portadaCasoHome, #botonCasoHome"
        ).empty();

        if (casos.length > 0) {
          renderTituloCasoHome(casos[0]);
          renderPortadaCasoHome(casos[0]);
          renderBotonCasoHome(casos[0]);
          renderSliderCasoHome(casos);
          renderSeleccionarVideo();
        } else {
          $("#sliderCasoHome").html(
            "<p>No se encontraron casos disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar los casos",
          text: "Hubo un problema al obtener los casos. Intente nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarBanners: function () {
    $.ajax({
      type: "GET",
      url: "/Banner/ListarBanners",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);
  
        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay banners disponibles",
            text: response?.message || "No se encontraron banners.",
          });
          return;
        }
  
        const banners = response.banners || [];
        $("#sliderBannerHome").empty();
  
        if (banners.length > 0) {
          renderSliderBannerHome(banners);
  
          // Esperar a que el DOM se actualice antes de inicializar Swiper
          requestAnimationFrame(() => {
            initSwiper(".mySwiper", {
              direction: "vertical",
              slidesPerView: 1,
              autoplay: {
                delay: 3000,
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
            });
          });
        } else {
          $("#sliderBannerHome").html(
            "<p>No se encontraron banners disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);
        Swal.fire({
          icon: "error",
          title: "Error al cargar los banners",
          text: "Hubo un problema al obtener los banners. Intente nuevamente más tarde.",
        });
      },
    });
  },
  
  loadListarInscripcions: function () {
    $.ajax({
      type: "GET", // M�todo GET para obtener las inscripciones
      url: "/Inscripcion/ListarInscripcions", // URL del controlador que devuelve la lista de inscripciones
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        // Verificar si la respuesta es exitosa
        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay inscripciones disponibles",
            text: response?.message || "No se encontraron inscripciones.",
          });
          return;
        }

        const inscripcions = response.inscripcions || [];

        // Limpia el contenedor de inscripciones antes de renderizar
        $("#tituloInscHome").empty();
        $("#descrInscrHome").empty();
        $("#sliderInscrHome").empty();
        $("#botonInscHome").empty();

        if (inscripcions.length > 0) {
          renderTituloInscHome(inscripcions[0]);
          renderDescrInscrHome(inscripcions[0]);
          renderBotonInscHome(inscripcions[0]);
          renderSliderInscrHome(inscripcions);
        } else {
          $("#sliderInscrHome").html(
            "<p>No se encontraron inscripciones disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar las inscripciones",
          text: "Hubo un problema al cargar las inscripciones. Por favor, int�ntelo nuevamente m�s tarde.",
        });
      },
    });
  },
  loadListarFooters: function () {
    $.ajax({
      type: "GET", // M�todo GET para obtener los footers
      url: "/Footer/ListarFooters", // URL del controlador que devuelve la lista de footers
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        // Verificar si la respuesta es exitosa
        if (!response?.success) {
          Swal.fire({
            icon: "error",
            title: "No hay footers disponibles",
            text: response?.message || "No se encontraron footers.",
          });
          return;
        }

        const footers = response?.footers || [];

        // Limpia el contenedor de footers antes de renderizar
        $("#footerHome").empty();

        if (footers.length > 0) {
          renderFooterHome(footers[0]);
        } else {
          $("#footerHome").html(
            "<p>No se encontraron footers disponibles.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

        Swal.fire({
          icon: "error",
          title: "Error al cargar los footers",
          text: "Hubo un problema al cargar los footers. Por favor, int�ntelo nuevamente m�s tarde.",
        });
      },
    });
  },
};
function renderContactoHome(fcont) {
  const html = `
               <div class="row mb-5">
            <div class="col-12">
                <h2>${fcont.fcon_Titulo}</h2>
                <div class="red-linear"></div>
            </div>
        </div>
        <div class="row contacto">
            <div class="col-12 col-md-7 description">
                <div class="title">
                    <h3>${fcont.fcon_SubTitulo}</h3>
                    <p>${fcont.fcon_DescripcionSubTitulo}</p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span>${fcont.fcon_Direccion}</span>
                    </p>
                </div>
            </div>
            <div class="col-12 col-md-5 data">
                <h3>${fcont.fcon_SubTituloDos}</h3>
                <p class="d-flex align-items-center gap-2">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <span> Correo: </span>
                    </strong>
                    <span>
                       ${fcont.fcon_Correo}
                    </span>
                </p>
                <p class="d-flex align-items-center gap-2">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        <span> Celular: </span>
                    </strong>
                    <span>
                        ${fcont.fcon_Telefono}
                    </span>
                </p>
                <p class="d-flex align-items-center gap-2">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        <span>  Horario: </span>
                    </strong>
                    <span>
                         ${fcont.fcon_Horario}
                    </span>
                </p>

                <div class="btn-test">
                    <div class="button-test">
                        <a href="">${fcont.fcon_NombreBoton}</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      `;
  $("#contactoHome").append(html);
}
function renderTituloEGHome(egra) {
  const html = `
              <h2>${egra.egra_Titulo}</h2>
                <div class="red-linear"></div>
      `;
  $("#tituloEGHome").append(html);
}
function renderBotonEGHome(egra) {
  const html = `
              <a href="">${egra.egra_NombreBoton}</a>
                <img src="${egra.egra_UrlBoton}"
                     alt="" />
      `;
  $("#botonEGHome").append(html);
}
function renderSliderEGHome(empresas) {
  // Genera los elementos del men� din�micamente
  let html = "";
  empresas.slice(1, 5).forEach((egra) => {
    html += `
              <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
                <img src="${egra.egra_UrlLogo}" alt="" class="img-fluid mb-4">
                <h4>${egra.egra_NombreEmpresa}</h4>
                <a href="#">${egra.egra_Correo}</a>
                <span>${egra.egra_Descripcion}</span>
            </div>
        `;
  });
  $("#sliderEGHome").append(html);
}
function renderTituloPEmpHome(pemp) {
  const html = `
               <h2 class="text-start title-nuestro-requisitos">${pemp.pemp_Nombre}</h2>
      `;
  $("#tituloPEmpHome").append(html);
}
function renderSlidePEmpHome(pemps) {
  // Genera los elementos del men� din�micamente
  let html = "";
  pemps.slice(1, 5).forEach((pemp) => {
    html += `
            <div class="col-6 col-md-3 text-center">
                <img src="${pemp.pemp_UrlImagen}" alt="" class="img-fluid rounded-pill w-80">
                <p class="mt-2">${pemp.pemp_Descripcion}</p>
            </div>
        `;
  });
  $("#sliderPEmpHome").append(html);
}
function renderTituloTestHome(test) {
  const html = `
            <div class="col-12">
                <h2>${test.test_Nombre}</h2>
                <div class="red-linear"></div>
            </div>
      `;
  $("#tituloTestHome").append(html);
}
function renderSlideTestHome(testimonios) {
  // Genera los elementos del men� din�micamente
  let html = "";
  const testimoniosContador = testimonios.slice(1);
  testimoniosContador.forEach((test) => {
    html += `        
        <div class="swiper-slide">
        <div class="testomnio_item card border-0 shadow-lg">
            <span class="quote">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                </svg>
            </span>
            <p class="description">${test.test_Descripcion}</p>
            <div class="avatar">
                <img src="${test.test_UrlImagen}" alt="">
            </div>
            <div class="text-center position-absolute start-50 translate-middle-x container-linkedin d-flex flex-column align-items-center justify-content-center">
                <span>${test.test_Nombre} Hola mundo</span>
                <a href="" class="text-primary text-decoration-none linkedin-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
    </svg>
                </a>
            </div>
        </div>
    </div>
        `;
  });
  $("#slideTestHome").append(html);

}
function renderLogrosHome(logros) {

  let html = "";
  logros.forEach((logr) => {
    html += `
           <div class="item d-block d-lg-flex align-items-center gap-2 text-center text-lg-start w-100">
            <img src="${logr.logr_UrlIcon}" alt="" />
            <div class="description text-white">
                <h3 class="fs-10">${logr.logr_Nombre}</h3>
                <p class="fs-8 texto-descriptivo-quick_data">
                   ${logr.logr_Descripcion}
                </p>
            </div>
        </div>
        `;
  });
  $("#logrosHome").append(html);
}
function renderFooterHome(foot) {
  const html = `
      <div class="container pt-4 pb-5">
      <div class="logo_footer mb-4">
        <img src="${foot.foot_UrlLogoPrincipal}" alt="" class="img-fluid">
      </div>
      <div class="row">
        <div class="col-12 col-md-8 text-white">
          <h4 class="mb-3 fs-5"> ${foot.foot_Nombre}</h4>
          <p class="d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
            ${foot.foot_Contacto}
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
            ${foot.foot_Ubicacion}
          </p>
        </div>
        <div class="col-12 col-md-4 text-white text-center text-md-end">
          <strong>${foot.foot_Ayuda}</strong>
          <p class="mb-5">Comunicate con nosotros</p>
          <div class="d-flex gap-3 justify-content-center justify-content-md-end mb-5">
            <a href="" class="text-white text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
            </a>
            <a href="" class="text-white text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </a>
          </div>
          <div class="logo_ministerio">
            <img src="${foot.foot_UrlLogoSecundario}" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
      `;
  $("#footerHome").append(html);
}
function renderMenuHome(menus) {
  // Genera los elementos del men� din�micamente
  let html = `
        <li class="home">
            <a href="/Home/Index" class="d-flex align-items-center gap-2 text-decoration-none">
              <?xml version="1.0" ?><svg
                fill="none"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5495 2.53189C11.3874 1.82531 12.6126 1.82531 13.4505 2.5319L20.2005 8.224C20.7074 8.65152 21 9.2809 21 9.94406V19.7468C21 20.7133 20.2165 21.4968 19.25 21.4968H15.75C14.7835 21.4968 14 20.7133 14 19.7468V14.2468C14 14.1088 13.8881 13.9968 13.75 13.9968H10.25C10.1119 13.9968 9.99999 14.1088 9.99999 14.2468V19.7468C9.99999 20.7133 9.2165 21.4968 8.25 21.4968H4.75C3.7835 21.4968 3 20.7133 3 19.7468V9.94406C3 9.2809 3.29255 8.65152 3.79952 8.224L10.5495 2.53189ZM12.4835 3.6786C12.2042 3.44307 11.7958 3.44307 11.5165 3.6786L4.76651 9.37071C4.59752 9.51321 4.5 9.72301 4.5 9.94406V19.7468C4.5 19.8849 4.61193 19.9968 4.75 19.9968H8.25C8.38807 19.9968 8.49999 19.8849 8.49999 19.7468V14.2468C8.49999 13.2803 9.2835 12.4968 10.25 12.4968H13.75C14.7165 12.4968 15.5 13.2803 15.5 14.2468V19.7468C15.5 19.8849 15.6119 19.9968 15.75 19.9968H19.25C19.3881 19.9968 19.5 19.8849 19.5 19.7468V9.94406C19.5 9.72301 19.4025 9.51321 19.2335 9.37071L12.4835 3.6786Z"
                  fill="#C41121"
                />
              </svg>
              <span class="d-block d-lg-none">Inicio</span>
            </a>
        </li>
    `;
  menus.forEach((item) => {
    html += `
            <li>
                <a href="${
                  item.menu_UrlIconBoton || "#"
                }" class="text-decoration-none">
                    ${item.menu_Nombre}
                </a>
            </li>
        `;
  });
  $("#menuHome").append(html);
}
function openMenu() {
  $(".main_nav").show("slow");
}
function closeMenu() {
  $(".main_nav").hide("slow");
}
function renderLogoHome(logo) {
  const html = `
      <img
            src="${logo.logo_UrlPrincipal}"
            alt="Logo Superior"
            class="logo-header"
          />
          <button class="btn btn-transparent d-block d-lg-none text-white" id="openMenu" onclick="openMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
          </button>
          <a
            href=""
            class="btn bg-primary text-white rounded-pill header_btn d-flex align-items-center justify-content-center gap-1 d-none d-lg-block"
          >
           ${logo.logo_NombreBoton}
            <img
              src="${logo.logo_UrlIconBoton}"
              alt="icono de diagnostico"
            />
          </a>
      `;
  $("#logoHome").append(html);
}
function renderTituloInscHome(insc) {
  const html = `
     <h2 class="text-start title-nuestro-requisitos">${insc.insc_Titulo}</h2>
      `;
  $("#tituloInscHome").append(html);
}
function renderDescrInscrHome(insc) {
  const html = `  
              ${insc.insc_Contenido}
           
      `;
  $("#descrInscrHome").append(html);
}
function renderBotonInscHome(insc) {
  const html = `  
             <a href="">  ${insc.insc_NombreBoton}</a>
                    <img src="${insc.insc_URLIconBoton}"
                         alt="" />
           
      `;
  $("#botonInscHome").append(html);
}
function renderSliderInscrHome(inscripcions) {
  let slider = "";
  inscripcions.slice(0, 5).forEach((insc, index) => {
    if (insc.insc_Orden > 0) {
      const isActive = index === 1 ? "active" : "";
      slider += `
                <div class="step">
                    <div class="step-image">
                        <img src="${insc.insc_URLImagen}"
                             alt="Paso 1" />
                    </div>
                    <div class="step-content ${
                      index % 2 == 0 ? "left-align" : "right-align"
                    }">
                        <p class="step-indicator">PASO ${insc.insc_Paso}</p>
                        <h3 class="step-title">${insc.insc_TituloPaso}</h3>
                        <p class="p-p">
                            ${insc.insc_Descripcion}
                        </p>
                    </div>
                </div>

                 `;
    }
  });

  $("#sliderInscrHome").append(slider);
}
function renderSliderBannerHome(banners) {
  let slider = "";
  banners.forEach((bann, index) => {
    if (bann.bann_Orden > 0) {
      const isActive = index === 1 ? "active" : "";
      slider += `
                  <div class="swiper-slide">
                <picture class="hero_bg">
                    <source srcset="${bann.bann_URLImagen}" media="(min-width: 768px)" />
                    <source srcset="${bann.bann_URLImagen}" media="(min-width: 992px)" />
                    <img src="${bann.bann_URLImagen}" class="img-fluid" alt="Hero" />
                </picture>
                <div class="overlay"></div>
                <div class="container">
                    <div class="content">
                        <p class="text-white">
                           ${bann.bann_Nombre}
                        </p>
                    </div>
                </div>
            </div>

                 `;
    }
  });

  $("#sliderBannerHome").html(slider);
}
function renderTituloCasoHome(caso) {
  const html = `
     <h2>${caso.cexi_Titulo}</h2>
                <div class="red-linear"></div>     
      `;
  $("#tituloCasoHome").append(html);
}
function renderPortadaCasoHome(caso) {
  const html = `
          <iframe width="100%"
                        height="100%"
                        src="${caso.cexi_UrlVideo}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
      `;
  $("#portadaCasoHome").append(html);
}
function renderBotonCasoHome(caso) {
  const html = `
           <a href="Caso/index"> ${caso.cexi_NombreBoton}</a>
                <img src="${caso.cexi_UrlBoton}"
                     alt="" />
      `;
  $("#botonCasoHome").append(html);
}
function renderSliderCasoHome(casos) {
  let slider = "";
  casos.slice(0, 5).forEach((caso, index) => {
    if (caso.cexi_Orden > 0) {
      const isActive = index === 1 ? "active" : "";
      slider += `
                    <div class="video_item row ${isActive}" data-video="${caso.cexi_UrlVideo}">
                        <div class="col-8">
                            <h4>${caso.cexi_Nombre}</h4>
                            <p>${caso.cexi_Descripcion}</p>
                        </div>
                        <div class="col-4">
                            <img src="${caso.cexi_UrlPerfil}" alt="">
                        </div>
                    </div>

                 `;
    }
  });

  $("#sliderCasoHome").append(slider);
}
function renderTituloBeneficioHome(bene) {
  const html = `
     <h2>${bene.bene_Titulo}</h2>
                <div class="red-linear"></div>     
      `;
  $("#tituloBeneficioHome").append(html);
}

function initSwiper(selector, config) {
  if (!$(selector).length) return;
  if (window.swiperInstances && window.swiperInstances[selector]) {
    window.swiperInstances[selector].destroy(true, true);
  }


  window.swiperInstances = window.swiperInstances || {};
  window.swiperInstances[selector] = new Swiper(selector, config);
}

function renderPortadaBeneficioHome(bene) {
  const html = `
     <img src="${bene.bene_URLImagen}"
                     class="img-fluid rounded-4 h-100"
                     alt="" />
      `;
  $("#portadaBeneficioHome").append(html);
}
function renderSliderBeneficioHome(beneficio) {
  let slider = "";

  beneficio.slice(0, 5).forEach((bene) => {
    if (bene.bene_Orden > 0) {
      slider += `
             <div class="beneficio_item">
                    <h3 class="d-flex align-items-center gap-3">
                        <img src="${bene.bene_URLIcon}" alt="">
                        <span>${bene.bene_Nombre}</span>
                    </h3>
                    <p>${bene.bene_Descripcion}</p>
                </div>
                 `;
    }
  });

  $("#sliderBeneficioHome").append(slider);
}
function renderTituloRequisitoHome(requ) {
  const tituloRequisitoHome = `
     <h2 class="text-start title-nuestro-requisitos">${requ.requ_Titulo}</h2>
        <div class="red-linear"></div>
      `;
  $("#tituloRequisitoHome").append(tituloRequisitoHome);
}
function renderSliderRequisitoHome(requisitos) {
  let slider = "";

  requisitos.slice(0, 5).forEach((requ) => {
    if (requ.requ_Orden > 0) {
      slider += `
             <div class="btn-group col-12 col-md-6 p-3">
            <div class="list-group-item d-flex align-items-center justify-content-between w-100">
                <div class="d-flex align-items-center w-100">
                    <img src="${requ.requ_URLIcon}"
                         alt="${requ.requ_Nombre}"
                         class="icon-img" />
                    <span class="text-requisitos w-100">${requ.requ_Nombre}</span>
                </div>
                
            </div>
            
            
        </div>
                 `;
    }
  });

  $("#sliderRequisitoHome").append(slider);
}
function renderSeccionHome(info) {
  const seccion = `
    <div class="row">
        <div class="col-12 col-md-5" >
            <h2 class="text-start title-que-es">${info.info_Titulo}</h2>
            <div class="red-linear"></div>
            <p class="texto-que-es fs-12 mt-4">
               ${info.info_Descripcion}
            </p>
        </div>
        <div class="col-12 col-md-7">
            <div class="video_about rounded-3 overflow-hidden p-0">
                <iframe width="100%"
                height="100%"
                src="${info.info_URLVideo}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
        </div>
    </div>        
      `;
  $("#seccionHome").append(seccion);
}
function renderTituloCursoHome(curso) {
  const tituloCursoHome = `
     <h2>${curso.curs_Titulo}</h2>
     <div class="red-linear"></div>
      `;
  $("#tituloCursoHome").append(tituloCursoHome);
}
function renderBotonCursoHome(curso) {
  const botonCursoHome = `      
            <a href="/Curso/Index">${curso.curs_NombreBotonTitulo}</a>
            <img src="${curso.curs_UrlIconBoton}"
                 alt="" />      
      `;
  $("#botonCursoHome").append(botonCursoHome);
}
function renderSliderCursoHome(cursos) {
  let sliderCurso = "";

  cursos.forEach((curs) => {
    if (curs.curs_Orden > 0) {
      sliderCurso += `
                <div class="swiper-slide p-3">
                    <div class="card rounded-4 overflow-hidden border-0 shadow-md">
                        <img src="${curs.curs_UrlImagen}" alt="">
                            <div class="content p-3">
                                <h4>${curs.curs_NombreCurso}</h4>
                                <p class="curso_description">orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula</p>
                                <p class="d-flex align-items-center gap-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0070BA" class="bi bi-calendar4-week" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <strong>Virtual en Vivo:</strong>
                                    <span>Del ${obtenerDia(
                                      formatearFechaInversa(
                                        curs.curs_FechaInicio
                                      )
                                    )} al ${obtenerDia(
        formatearFechaInversa(curs.curs_FechaFin)
      )} del ${obtenerAno(formatearFechaInversa(curs.curs_FechaFin))}</span>
                                </p>
                                <p class="d-flex align-items-center gap-1  mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0070BA" class="bi bi-clock-history" viewBox="0 0 16 16">
                                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                    <strong>A tu ritmo:</strong>
                                    <span>${curs.curs_Modalidad}</span>
                                </p>
                                <div class="d-flex justify-content-center">
                                    <a href="${
                                      curs.curs_LinkBoton
                                    }" class="button_brochure" target="_blank">
                                        ${curs.curs_NombreBoton}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                                            <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                    </div>
                </div>
                 `;
    }
  });

  $("#sliderCursoHome").append(sliderCurso);
}
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var swiper = new Swiper(".cursos_swiper", {
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3.2,
      spaceBetween: 20,
    },
  },
});
var swiper = new Swiper(".testomnios_swiper", {
    direction: "horizontal",
    slidesPerView: 3,
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0"); // D�a con dos d�gitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos d�gitos
  const anio = fecha.getFullYear(); // A�o completo

  return `${dia}/${mes}/${anio}`; // Cambia el formato seg�n sea necesario
}
function formatearFechaInversa(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0"); // D�a con dos d�gitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos d�gitos
  const anio = fecha.getFullYear(); // A�o completo

  return `${anio}-${mes}-${dia}`; // Cambia el formato seg�n sea necesario
}
// Funci�n para obtener el d�a de una fecha
function obtenerDia(fecha) {
  const fechaObj = new Date(fecha);
  return fechaObj.getDate();
}
// Funci�n para obtener el a�o de una fecha
function obtenerAno(fecha) {
  const fechaObj = new Date(fecha);
  return fechaObj.getFullYear();
}
function renderSeleccionarVideo() {
  // Escuchar clic en cualquier elemento con la clase "video_item"
  $(".video_item").on("click", function () {
    // Remover la clase "active" de todos los elementos
    $(".video_item").removeClass("active");

    // Agregar la clase "active" al elemento seleccionado
    $(this).addClass("active");

    // Obtener la URL del video (puedes almacenar la URL en un atributo personalizado como "data-video")
    const videoURL = $(this).data("video");

    // Actualizar el iframe con la nueva URL
    $(".exito_video iframe").attr("src", videoURL);
  });
}
function cambiarImagenDinamica(imagenUrl) {
  // Usamos jQuery para modificar el background-image
  $(".hero").css("background-image", "url(" + imagenUrl + ")");
}
// Funci�n para mostrar mensajes de error con Swal
function showErrorMessage(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}
async function cargarRegion() {
  try {
    const response = await $.ajax({
      url: "/Empresa/ListarRegiones",
      type: "GET",
      dataType: "json",
    });

    console.log("Lista de regiones:", response);

    const select = $("#inputRegion");
    select
      .empty()
      .append("<option selected>Seleccione su regi&oacute;n</option>");

    if (Array.isArray(response.regions) && response.regions.length > 0) {
      response.regions.forEach((region) => {
        select.append(new Option(region.regi_Nombre, region.regi_ID));
      });
    } else {
      select.append("<option disabled>No hay regiones disponibles</option>");
    }
  } catch (error) {
    console.error("Error al cargar las regiones:", error);
    $("#inputRegion")
      .empty()
      .append("<option disabled>Error al cargar regiones</option>");

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al cargar las regiones. Int�ntelo m�s tarde.",
    });
  }
}
async function cargarTiposEmpresa() {
  try {
    const response = await $.ajax({
      url: "/Empresa/ListarTipoEmpresas",
      type: "GET",
      dataType: "json",
    });

    console.log("Lista de tipos de empresa:", response);

    const select = $("#inputTipoEmpresa");
    select.empty().append("<option selected>Seleccione su tipo</option>");

    if (
      Array.isArray(response.tipoEmpresas) &&
      response.tipoEmpresas.length > 0
    ) {
      response.tipoEmpresas.forEach((tipo) => {
        select.append(new Option(tipo.temp_Nombre, tipo.temp_ID));
      });
    } else {
      select.append(
        "<option disabled>No hay tipos de empresa disponibles</option>"
      );
    }
  } catch (error) {
    console.error("Error al cargar los tipos de empresa:", error);
    $("#inputTipoEmpresa")
      .empty()
      .append("<option disabled>Error al cargar tipos de empresa</option>");

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al cargar los tipos de empresa. Int�ntelo m�s tarde.",
    });
  }
}
async function cargarTiposEvento() {
  try {
    const response = await $.ajax({
      url: "/Curso/ListarTipoEventos",
      type: "GET",
      dataType: "json",
    });

    console.log("Lista de tipos de eventos:", response);

    const select = $("#inputTipoEvento");
    select.empty().append("<option selected>Seleccione su tipo</option>");

    if (
      Array.isArray(response.tipoEventos) &&
      response.tipoEventos.length > 0
    ) {
      response.tipoEventos.forEach((tipo) => {
        select.append(new Option(tipo.teve_Nombre, tipo.teve_ID));
      });
    } else {
      select.append(
        "<option disabled>No hay tipos de eventos disponibles</option>"
      );
    }
  } catch (error) {
    console.error("Error al cargar los tipos de eventos:", error);
    $("#inputTipoEvento")
      .empty()
      .append("<option disabled>Error al cargar tipos de eventos</option>");

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al cargar los tipos de eventos. Int�ntelo m�s tarde.",
    });
  }
}