$(document).ready(function () {
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
      success: function ({ success, logros }) {
        console.log("Respuesta de logros:", logros);

        if (logros.length === 0 || logros.length === 1) {
          $("#seccionLogros").hide();
        }

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
        if (success) {
          toggleSectionVisibility("#seccionTestimoniales", testimonios);
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
        const perfilEmpresarials = response.perfilEmpresarials || [];

        toggleSectionVisibility("#seccionEmpresarial", perfilEmpresarials);

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
        const empresas = response.empresas || [];

        toggleSectionVisibility("#seccionEmpresasGraduadas", empresas);

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
        console.error("Error en AJAX:", status, error);

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
        const informacions = response.informacions || [];

        toggleSectionVisibility("#seccionHome", informacions, 1);
        $("#seccionHome").empty();

        if (informacions.length > 0) {
          renderSeccionHome(informacions[0]);
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

  loadListarRequisitos: function () {
    $.ajax({
      type: "GET",
      url: "/Requisito/ListarRequisitos",
      dataType: "json",
      success: function (response) {
        console.log("Respuesta del servidor requisitos:", response);

        const requisitos = response.requisitos || [];

        toggleSectionVisibility("#seccionRequisitos", requisitos);

        $(
          "#tituloRequisitoHome, #sliderRequisitoHome",
          "botonRequisitoHome",
          "#seccionRequisitos"
        ).empty();

        if (requisitos.length > 0) {
          renderTituloRequisitoHome(requisitos[0]);
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
        if (response.success) {
          const beneficios = response.beneficios || [];

          toggleSectionVisibility("#seccionBeneficios", beneficios);

          if (beneficios.length > 0) {
            renderTituloBeneficioHome(beneficios[0]);
            renderPortadaBeneficioHome(beneficios[0]);
            renderBotonCursoBeneficio(beneficios[0]);
            renderSliderBeneficioHome(beneficios);
          }
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
        const casos = response.casos || [];

        toggleSectionVisibility("#seccionCasosExito", casos);

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
              direction: "horizontal",
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
                <div class="red-linear mb-5 mb-md-0"></div>
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
              <a href="/Empresa/Index" class="full-button">
                <div class="button-test">
                <span>${egra.egra_NombreBoton}</span>
                <img src="${egra.egra_UrlBoton}"
                     alt="${egra.egra_UrlBoton}" />
                </div>

              </a>
      `;
  $("#botonEGHome").append(html);
}

function renderField(label, value, isLink = false, isEmail = false) {
  if (!value || value.trim() === "") return "";

  value = value.trim();

  if (isLink) {
    let url = value;

    if (isEmail) {
      url = `mailto:${value}`;
    } else if (!value.startsWith("http://") && !value.startsWith("https://")) {
      url = `https://${value}`;
    }

    return `<p><strong>${label}:</strong> <a href="${url}" target="_blank">${value}</a></p>`;
  }

  return `<p><strong>${label}:</strong> ${value}</p>`;
}

function renderSocialMediaList(egra) {
  let redesSociales = [
    egra.egra_RedesSociales,
    egra.egra_RedesSocialesDos,
    egra.egra_RedesSocialesTres,
    egra.egra_RedesSocialesCuatro,
  ].filter((red) => red && red.trim() !== "");

  if (redesSociales.length === 0) return "";

  return `
    <p><strong>Redes Sociales:</strong></p>
    <ul>
      ${redesSociales
        .map((red) => `<li><a href="${red}" target="_blank">${red}</a></li>`)
        .join("")}
    </ul>
  `;
}

function renderSliderEGHome(empresas) {
  let html = "";

  empresas.slice(1, 7).forEach((egra) => {
    html += `
      <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
          ${
            egra.egra_UrlLogo
              ? `<img src="${egra.egra_UrlLogo}" alt="${egra.egra_NombreEmpresa}" class="img-fluid mb-4">`
              : ""
          }
          ${
            egra.egra_NombreEmpresa ? `<h4>${egra.egra_NombreEmpresa}</h4>` : ""
          }

          ${renderField("Correo", egra.egra_Correo, true, true)}
          ${renderField("Descripción", egra.egra_Descripcion)}
          ${renderField("RUC", egra.egra_RUC)}
          ${renderField("Tipo de Empresa", egra.tipoEmpresa)}
          ${renderField("Razón Social", egra.egra_RazonSocial)}
          ${renderField("Mercados", egra.egra_MercadosSegmentosAtendidos)}
          ${renderField("Certificaciones", egra.egra_Certificaciones)}
          ${renderField("Dirección", egra.egra_Direccion)}
          ${renderField("Región", egra.region)}
          ${renderField("Página Web", egra.egra_PaginaWeb, true)}
          ${renderField("Segmentos Atendidos", egra.egra_SegmentosAtendidos)}
          ${renderField("Título", egra.egra_Titulo)}
          ${renderSocialMediaList(egra)}
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
              <h5>${test.test_Nombre} </h5>
              <p>${test.test_NombreEmpresa} </p>
            </div>
           
        </div>
    </div>
        `;
  });
  $("#slideTestHome").append(html);
}
function renderLogrosHome(logros) {
  console.log("renderLogrosHome", logros);
  let html = "";
  logros.forEach((logr) => {
    html += `
         <div class="item d-block d-lg-flex align-items-center gap-2 text-center text-lg-start w-100">
             <h4 class="m-0 p-0 pt-1 me-md-2">${logr.logr_Contador}</h4> 
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

function renderBotonRequisitosHome(req) {
  const html = `  
            <a href="/Requisito/Index" class="full-button"> 
              <div class="button-test">
                <span> ${req.requ_Nombre} </span>
                <img src="${req.requ_URLIcon}" alt="${req.requ_URLIcon}" />
              </div>
            </a>
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
           <a href="/Caso/index" class="full-button"> 
            <div class="button-test">
               <span>${caso.cexi_NombreBoton}</span>
                <img src="${caso.cexi_UrlBoton}"
                     alt="" />
            </div>
            </a>
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
            <a href="/Beneficio/Index" class="full-button">
            <div class="button-test">
               <span>${beneficio.bene_NombreBoton}</span>
               <img src="${beneficio.bene_URLIcon}"
                 alt="${beneficio.bene_URLIcon}" />      
            </div>
            </a>
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

var swiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  touchReleaseOnEdges: true,
});

var swiper = new Swiper(".testomnios_swiper", {
  direction: "horizontal",
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,

  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-testimonio-next",
    prevEl: ".swiper-testimonio-prev",
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    480: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 3, spaceBetween: 20 },
  },
  on: {
    init: function () {
      this.loopFix();
    },
  },
});

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
function formatearFechaInversa(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${anio}-${mes}-${dia}`;
}

function obtenerDia(fecha) {
  const fechaObj = new Date(fecha);
  return fechaObj.getDate();
}

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

const toggleSectionVisibility = (sectionId, dataArray = [], minLength = 2) => {
  if (!Array.isArray(dataArray)) {
    console.error(
      `toggleSectionVisibility: El segundo parámetro debe ser un array. Recibido:`,
      dataArray
    );
    return;
  }

  if (dataArray.length < minLength) {
    $(sectionId).hide();
    console.log(
      `Se ocultó ${sectionId} porque tiene ${dataArray.length} elementos (mínimo requerido: ${minLength})`
    );
    return true;
  }

  $(sectionId).show();
  console.log(`Se mostró ${sectionId} con ${dataArray.length} elementos`);
  return false;
};
