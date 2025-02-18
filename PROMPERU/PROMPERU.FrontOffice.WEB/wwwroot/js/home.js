$(document).ready(function () {
  home.loadListarCursos();
  home.loadListarInformacion();
  home.loadListarRequisitos();
  home.loadListarBeneficios();
  home.loadListarCasos();
  home.loadListarBanners();
  home.loadListarLogros();
  home.loadListarTestimonios();
  home.loadListarPerfilEmpresarials();
  home.loadListarFormularioContactos();
  home.loadListarEmpresaGraduadas();
});

const home = {
  loadListarLogros: function () {
    $.ajax({
      type: "GET",
      url: "/Logro/ListarLogros",
      dataType: "json",
      success: function ({ success, logros, message }) {
        console.log("Respuesta de logros:", logros);

        const $logrosHome = $("#logrosHome");
        $logrosHome.empty();

        if (success) {
          if (logros.length > 0) {
            renderLogrosHome(logros);
          } else {
            $logrosHome.html(
              "<p>No hay información de logros disponibles.</p>"
            );
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "No hay logros disponibles",
            text: message || "No se encontraron logros.",
          });
        }
      },
      error: function (status, error) {
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

        const $tituloTestHome = $("#tituloTestHome");
        const $slideTestHome = $("#slideTestHome");
        $tituloTestHome.empty();
        $slideTestHome.empty();

        if (success) {
          if (testimonios.length > 0) {
            renderTituloTestHome(testimonios[0]);
            renderSlideTestHome(testimonios);
          } else {
            $slideTestHome.html(
              "<p>No hay información de testimonios disponibles.</p>"
            );
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "No hay testimonios disponibles",
            text: message || "No se encontraron testimonios.",
          });
        }
      },
      error: function (status, error) {
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
          renderTituloPEmpHome(perfilEmpresarials[0]);
          renderSlidePEmpHome(perfilEmpresarials);
        } else {
          $("#sliderPEmpHome").html(
            "<p>No hay información de testimonios disponibles.</p>"
          );
        }
      },
      error: function (status, error) {
        console.error("Error en AJAX:", status, error);

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
        // $("#contactoHome").empty();

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
          renderContactoHome(formularioContactos[0]);
        } else {
          $("#contactoHome").html(
            "<p>No hay información de contacto disponible.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en AJAX:", status, error);

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
          console.warn('no hay cursos disponibles')
        }

        const cursos = response.cursos || [];


        $("#tituloCursoHome, #botonCursoHome, #sliderCursoHome").empty();

        if (cursos.length > 0) {
          renderTituloCursoHome(cursos[0]);
          renderBotonCursoHome(cursos[0]);
          renderSliderCursoHome(cursos);
        }
      },
      error: function ( status, error) {
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
        $(
          "#tituloRequisitoHome, #sliderRequisitoHome",
          "botonRequisitoHome"
        ).empty();

        if (requisitos.length > 0) {
          renderTituloRequisitoHome(requisitos[0]); // Se corrigi� el typo en la funci�n
          renderSliderRequisitoHome(requisitos);
          renderBotonRequisitosHome(requisitos[0]);
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
      type: "GET",
      url: "/Beneficio/ListarBeneficios",
      dataType: "json",
      success: function (response) {
        console.log(response);
        $("#tituloBeneficioHome").empty();
        $("#sliderBeneficioHome").empty();
        $("#portadaBeneficioHome").empty();
        if (response.success) {
          const beneficios = response.beneficios;
          console.log("beneficios", beneficios);
          if (beneficios.length > 0) {
            renderTituloBeneficioHome(beneficios[0]);
            renderPortadaBeneficioHome(beneficios[0]);
            renderBotonCursoBeneficio();
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

        $(
          "#tituloCasoHome, #sliderCasoHome, #portadaCasoHome, #botonCasoHome"
        ).empty();

        if (casos.length > 0) {
          renderTituloCasoHome(casos[0]);
          renderPortadaCasoHome(casos[1]);
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
};
function renderContactoHome(fcont) {
  const html = `
                <h2 class="section_title">${fcont.fcon_Titulo}</h2>
                <div class="red-linear"></div>
      `;
  $("#tituloContactoHome").append(html);
}
function renderTituloEGHome(egra) {
  const html = `
              <h2 class="section_title">${egra.egra_Titulo}</h2>
                <div class="red-linear"></div>
      `;
  $("#tituloEGHome").append(html);
}
function renderBotonEGHome(egra) {
  const html = `
              <a href="/Empresa/Index">${egra.egra_NombreBoton}</a>
                <img src="${egra.egra_UrlBoton}"
                     alt="" />
      `;
  $("#botonEGHome").append(html);
}
function renderSliderEGHome(empresas) {
  let html = "";
  empresas.slice(1, 7).forEach((egra) => {
    html += `
            <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
              <img src="${egra.egra_UrlLogo}" alt="" class="img-fluid mb-4">
              <h4>${egra.egra_NombreEmpresa}</h4>
              <a href="mailto:${egra.egra_Correo}">${egra.egra_Correo}</a>
              <span>${egra.egra_Descripcion}</span>
              <span>${egra.egra_Correo}</span>
              <span>${egra.egra_RUC}</span>
              <span>${egra.tipoEmpresa}</span>
              <span>${egra.egra_RazonSocial}</span>
              <span>${egra.egra_RUC}</span>
              <span>${egra.egra_Mercados}</span>
              <span>${egra.egra_Certificaciones}</span>
              <span>${egra.egra_Direccion}</span>
              <span>${egra.region}</span>
              <span>${egra.egra_PaginaWeb}</span>
              <span>${egra.egra_RedesSociales}</span>
              <span>${egra.egra_SegmentosAtendidos}</span>
              <span>${egra.egra_Titulo}</span>
            </div>
        `;
  });
  $("#sliderEGHome").append(html);
}
function renderTituloPEmpHome(pemp) {
  const html = `
               <h2 class="text-start section_title">${pemp.pemp_Nombre}</h2>
      `;
  $("#tituloPEmpHome").append(html);
}
function renderSlidePEmpHome(pemps) {
  // Genera los elementos del men� din�micamente
  let html = "";
  pemps.slice(1, 5).forEach((pemp) => {
    html += `
          <div class="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center text-center">
    <img src="${pemp.pemp_UrlImagen}" alt="" class="img-fluid rounded-pill max-image">
    <p class="max-text ">${pemp.pemp_Descripcion}</p>
</div>

        `;
  });
  $("#sliderPEmpHome").append(html);
}
function renderTituloTestHome(test) {
  const html = `
            <div class="col-12">
                <h2 class="section_title">${test.test_Nombre}</h2>
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
        <div class="testomnio_item card border-0">
            <span class="quote">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                </svg>
            </span>
             
            <p class="description">${test.test_Descripcion}</p>
            <div class="avatar">
                <img src="${test.test_UrlImagen}" alt="">
            </div>
            <div class="info-testimony">
              <h5>Jose Perez</h5>
              <p>IMB Consulting - Lima </p>
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
             <h4 class="m-0 p-0 pt-1 me-md-2">11</h4> 
          <div class="description text-white w-100">
              <div class="items">
                  <h3>${logr.logr_Nombre}</h3>
              </div>
              <p class="fs-8 texto-descriptivo-quick_data">
                  ${logr.logr_Descripcion}
              </p>
          </div>
        </div>

        `;
  });
  $("#logrosHome").append(html);
}

function openMenu() {
  $(".main_nav").show("slow");
}
function closeMenu() {
  $(".main_nav").hide("slow");
}

window.addEventListener("resize", function () {
  if (window.innerWidth >= 992) {
    $(".main_nav").show();
  }
});
function renderLogoHome(logo) {
  const html = `
  <div class="d-flex align-items-center gap-2">
      <img
            src="${logo.logo_UrlPrincipal}"
            alt="Logo Superior"
            class="logo-header"
          />
              <span class="separator mx-2 text-white">|</span>
  <img
            src="${logo.logo_UrlSecundario}"
            alt="Logo Inferior"
            class="logo-header"
          />
           </div>
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

function renderBotonRequisitosHome(req) {
  const html = `  
             <a href="/Requisito/Index">  ${req.requ_Nombre}</a>
                    <img src="${req.requ_URLIcon}" alt="${req.requ_URLIcon}" />
           
      `;
  $("#botonRequisitoHome").append(html);
}

function renderSliderBannerHome(banners) {
  let slider = "";
  banners.forEach((bann, index) => {
    if (bann.bann_Orden > 0) {
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
     <h2 class="section_title">${caso.cexi_Titulo}</h2>
                <div class="red-linear"></div>     
      `;
  $("#tituloCasoHome").append(html);
}
function renderPortadaCasoHome(caso) {
  const embedUrl = getEmbedUrl(caso.cexi_UrlVideo);
  const html = `
          <iframe width="100%"
                        height="100%"
                        src="${embedUrl}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
      `;
  $("#portadaCasoHome").append(html);
}
function renderBotonCasoHome(caso) {
  const html = `
           <a href="/Caso/index"> ${caso.cexi_NombreBoton}</a>
                <img src="${caso.cexi_UrlBoton}"
                     alt="" />
      `;
  $("#botonCasoHome").html(html);
}
function renderSliderCasoHome(casos) {
  let slider = "";
  casos.slice(0, 5).forEach((caso, index) => {
    if (caso.cexi_Orden > 0) {
      const embedUrl = getEmbedUrl(caso.cexi_UrlVideo);
      const isActive = index === 1 ? "active" : "";
      slider += `
                    <div class="video_item row ${isActive}" data-video="${embedUrl}">
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
     <h2 class="section_title">${bene.bene_Titulo}</h2>
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
      class="img-fluid rounded-4 image-benefits"
      alt="" />
      `;
  $("#portadaBeneficioHome").append(html);
}

function renderBotonCursoBeneficio(beneficio) {
  const botonCursoHome = `      
            <a href="/Beneficio/Index">Ver todo los benificios </a>
            <img src="../../shared/assets/home/etapas/empezar_test.svg"
                 alt="" />      
      `;
  $("#botonBeneficios").append(botonCursoHome);
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
     <h2 class="text-start section_title">${requ.requ_Titulo}</h2>
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
function getEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl);
    if (
      url.hostname.includes("youtube.com") ||
      url.hostname.includes("youtu.be")
    ) {
      const videoId =
        url.searchParams.get("v") || url.pathname.split("/").pop();
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch (error) {}
  return "https://www.youtube.com/embed/dQw4w9WgXcQ";
}

function renderSeccionHome(info) {
  const embedUrl = getEmbedUrl(info.info_URLVideo);

  const seccion = `
    <div class="row">
        <div class="col-12 col-md-5">
            <h2 class="text-start section_title">${info.info_Titulo}</h2>
            <div class="red-linear"></div>
            <p class="texto-que-es fs-12 mt-4">
               ${info.info_Descripcion}
            </p>
        </div>
        <div class="col-12 col-md-7">
            <div class="video_about rounded-3 overflow-hidden p-0">
                <iframe width="100%"
                height="100%"
                src="${embedUrl}"
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
     <h2 class="section_title">${curso.curs_Titulo}</h2>
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
    if (curs.curs_Orden > 0 && curs.curs_EsHabilitado != 0) {
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
                                    <strong>Horario:</strong>
                                    <span>Del ${obtenerDia(
                                      formatearFechaInversa(
                                        curs.curs_FechaInicio
                                      )
                                    )} de ${obtenerMes(
        curs.curs_FechaInicio
      )} al ${obtenerDia(
        formatearFechaInversa(curs.curs_FechaFin)
      )} de ${obtenerMes(curs.curs_FechaFin)} del ${obtenerAno(
        formatearFechaInversa(curs.curs_FechaFin)
      )}</span>
                                </p>
                                <p class="d-flex align-items-center gap-1  mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0070BA" class="bi bi-clock-history" viewBox="0 0 16 16">
                                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                    <strong>Modalidad:</strong>
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
    nextEl: ".swiper-testimonio-next",
    prevEl: ".swiper-testimonio-prev",
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
function obtenerMes(fechaStr) {
  const fecha = new Date(fechaStr);
  const opciones = { month: "long" };
  return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
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
    $(".exito_video iframe").attr("src", getEmbedUrl(videoURL));
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
