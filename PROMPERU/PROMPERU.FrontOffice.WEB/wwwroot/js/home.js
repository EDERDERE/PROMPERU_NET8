$(document).ready(function () {
    console.log('curso web home')
    home.loadListarCursos();
    home.loadListarInformacion();
    home.loadListarRequisitos();
    home.loadListarBeneficios();
    home.loadListarCasos();   
    home.loadListarBanners();
    home.loadListarInscripcions();
});

const home = {
    loadListarInformacion: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Informacion/ListarInformacions', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar        
                $('#seccionHome').empty();
                if (response.success) {
                    const informacions = response.informacions;
                    console.log('informacions', informacions[0])
                    if (informacions.length > 0) {
                        renderSeccionHome(informacions[0]);
                    } else {
                        $('#seccion').html('<p>No se información cursos disponibles.</p>');
                    }

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay cursos disponibles',
                        text: response.message || 'No se encontraron cursos.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los cursos. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });

    },
    loadListarCursos: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Curso/ListarCursos', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#tituloCursoHome').empty();
                $('#botonCursoHome').empty();
                $('#sliderCursoHome').empty();
                if (response.success) {
                    const cursos = response.cursos;
                    console.log('cursos', cursos)
                    if (cursos.length > 0) {
                        renderTituloCursoHome(cursos[0]);
                        renderBotonCursoHome(cursos[0]);
                        renderSliderCursoHome(cursos);
                    } else {
                        $('#sliderCursoHome').html('<p>No se encontraron cursos disponibles.</p>');
                    }

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay cursos disponibles',
                        text: response.message || 'No se encontraron cursos.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los cursos. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });

    },
    loadListarRequisitos: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Requisito/ListarRequisitos', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#tituloRequisitoHome').empty();
                $('#sliderRequisitoHome').empty();
                if (response.success) {
                    const requisitos = response.requisitos;
                    console.log('requisitos', requisitos)
                    if (requisitos.length > 0) {
                        rederTituloRequisitoHome(requisitos[0]);                 
                        renderSliderRequisitoHome(requisitos);
                    } else {
                        $('#sliderRequisitoHome').html('<p>No se encontraron requisitos disponibles.</p>');
                    }
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay banners disponibles',
                        text: response.message || 'No se encontraron banners.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });
    },
    loadListarBeneficios: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Beneficio/ListarBeneficios', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#tituloBeneficioHome').empty();
                $('#sliderBeneficioHome').empty();
                $('#portadaBeneficioHome').empty();
                if (response.success) {
                    const beneficios = response.beneficios;
                    console.log('beneficios', beneficios)
                    if (beneficios.length > 0) {
                        renderTituloBeneficioHome(beneficios[0]);
                        renderPortadaBeneficioHome(beneficios[0]);
                        renderSliderBeneficioHome(beneficios);
                    } else {
                        $('#sliderBeneficioHome').html('<p>No se encontraron requisitos disponibles.</p>');
                    }
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay banners disponibles',
                        text: response.message || 'No se encontraron banners.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });
    },
    loadListarCasos: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Caso/ListarCasos', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#tituloCasoHome').empty();
                $('#sliderCasoHome').empty();
                $('#portadaCasoHome').empty();
                $('#botonCasoHome').empty();
                if (response.success) {
                    const casos = response.casos;
                    console.log('casos', casos)
                    if (casos.length > 0) {
                        renderTituloCasoHome(casos[0]);
                        renderPortadaCasoHome(casos[0]);
                        renderBotonCasoHome(casos[0]);
                        renderSliderCasoHome(casos);                   
                        renderSeleccionarVideo();

                    } else {
                        $('#sliderCasoHome').html('<p>No se encontraron requisitos disponibles.</p>');
                    }
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay banners disponibles',
                        text: response.message || 'No se encontraron banners.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });
    },
    loadListarBanners: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Banner/ListarBanners', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#sliderBannerHome').empty();          
                if (response.success) {
                    const banners = response.banners;
                    console.log('banners', banners)
                    if (banners.length > 0) {                       
                        renderSliderBannerHome(banners);                 

                    } else {
                        $('#sliderBannerHome').html('<p>No se encontraron banners disponibles.</p>');
                    }
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay banners disponibles',
                        text: response.message || 'No se encontraron banners.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });
    },
    loadListarInscripcions: function () {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Inscripcion/ListarInscripcions', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#tituloInscHome').empty();
                $('#descrInscrHome').empty();
                $('#sliderInscrHome').empty();
                $('#botonInscHome').empty();
                if (response.success) {
                    const inscripcions = response.inscripcions;
                    console.log('inscripcions', inscripcions)
                    if (inscripcions.length > 0) {
                        renderTituloInscHome(inscripcions[0]);
                        renderDescrInscrHome(inscripcions[0]);
                        renderBotonInscHome(inscripcions[0]);
                        renderSliderInscrHome(inscripcions);
                    

                    } else {
                        $('#sliderCasoHome').html('<p>No se encontraron requisitos disponibles.</p>');
                    }
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'No hay banners disponibles',
                        text: response.message || 'No se encontraron banners.',
                    });
                }


            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los sliders',
                    text: 'Hubo un problema al cargar los banners. Por favor, inténtelo nuevamente más tarde.',
                });
            }
        });
    },
}
function renderTituloInscHome(insc) {
    const html = `
     <h2 class="text-start title-nuestro-requisitos">${insc.insc_Titulo}</h2>
      `;
    $('#tituloInscHome').append(html);
}
function renderDescrInscrHome(insc) {
    const html = `  
              ${insc.insc_Contenido}
           
      `;
    $('#descrInscrHome').append(html);
}

function renderBotonInscHome(insc) {
    const html = `  
             <a href="">  ${insc.insc_NombreBoton}</a>
                    <img src="${insc.insc_URLIconBoton}"
                         alt="" />
           
      `;
    $('#botonInscHome').append(html);
}
function renderSliderInscrHome(inscripcions) {
    let slider = '';
    console.log('sliderInscrHome', inscripcions)
    inscripcions.slice(0, 5).forEach((insc, index) => {
        if (insc.insc_Orden > 0) {
            const isActive = index === 1 ? 'active' : '';
            slider +=
                `
                <div class="step">
                    <div class="step-image">
                        <img src="${insc.insc_URLImagen}"
                             alt="Paso 1" />
                    </div>
                    <div class="step-content right-align">
                        <p>PASO ${insc.insc_Paso}</p>
                        <h3 class="step-title">${insc.insc_TituloPaso}</h3>
                        <p class="p-p">
                            ${insc.insc_Descripcion}
                        </p>
                    </div>
                </div>

                 `;

        }
    });

    $('#sliderInscrHome').append(slider);

}
function renderSliderBannerHome(banners) {
    let slider = '';
    console.log('sliderBannerHome', banners)
    banners.slice(0, 3).forEach((bann, index) => {
        if (bann.bann_Orden > 0) {
            const isActive = index === 1 ? 'active' : '';
            slider +=
                `
                  <div class="swiper-slide">
                <picture class="hero_bg">
                    <source srcset="../../shared/assets/home/hero/hero-tablet.jpg" media="(min-width: 768px)" />
                    <source srcset="../../shared/assets/home/hero/hero-desktop.jpg" media="(min-width: 992px)" />
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

    $('#sliderBannerHome').append(slider);

}
function renderTituloCasoHome(caso) {
    const html = `
     <h2>${caso.cexi_Titulo}</h2>
                <div class="red-linear"></div>     
      `;
    $('#tituloCasoHome').append(html);
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
    $('#portadaCasoHome').append(html);
}
function renderBotonCasoHome(caso) {
    const html = `
           <a href="Caso/index"> ${caso.cexi_NombreBoton}</a>
                <img src="${caso.cexi_UrlBoton}"
                     alt="" />
      `;
    $('#botonCasoHome').append(html);
}
function renderSliderCasoHome(casos) {
    let slider = '';
    console.log('renderSliderCasoHome',casos)
    casos.slice(0, 5).forEach((caso,index) => {
        if (caso.cexi_Orden > 0) {
            const isActive = index === 1 ? 'active' : '';
            slider +=
                `
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

    $('#sliderCasoHome').append(slider);

}

function renderTituloBeneficioHome(bene) {
    const html = `
     <h2>${bene.bene_Titulo}</h2>
                <div class="red-linear"></div>     
      `;
    $('#tituloBeneficioHome').append(html);
}
function renderPortadaBeneficioHome(bene) {
    const html = `
     <img src="${bene.bene_URLImagen}"
                     class="img-fluid rounded-4 h-100"
                     alt="" />
      `;
    $('#portadaBeneficioHome').append(html);
}
function renderSliderBeneficioHome(beneficio) {
    let slider = '';

    beneficio.slice(0, 5).forEach(bene => {
        if (bene.bene_Orden > 0) {
            slider +=
                `
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

    $('#sliderBeneficioHome').append(slider);

}


function rederTituloRequisitoHome(requ) {
    const tituloRequisitoHome = `
     <h2 class="text-start title-nuestro-requisitos">${requ.requ_Titulo}</h2>
        <div class="red-linear"></div>
      `;
    $('#tituloRequisitoHome').append(tituloRequisitoHome);
}
function renderSliderRequisitoHome(requisitos) {
    let slider = '';

    requisitos.slice(0, 5).forEach(requ => {
        if (requ.requ_Orden > 0) {
            slider +=
                `
             <div class="btn-group col-12 col-md-6 p-3">
            <button class="list-group-item d-flex align-items-center justify-content-between btn btn-light"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                <div class="d-flex align-items-center w-100">
                    <img src="${requ.requ_URLIcon}"
                         alt="${requ.requ_Nombre}"
                         class="icon-img" />
                    <span class="text-requisitos w-100">${requ.requ_Nombre}</span>
                </div>
                <span class="bi-chevron-down">
                    <svg width="10"
                         height="11"
                         viewBox="0 0 10 11"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_40000240_376)">
                            <path d="M1.05252 3.76229C0.869476 3.94535 0.869476 4.24215 1.05252 4.42521L4.16713 7.53979C4.71618 8.08884 5.60624 8.08898 6.15549 7.54016L9.2377 4.46034C9.42077 4.27728 9.42077 3.98048 9.2377 3.79743C9.05465 3.61437 8.75785 3.61437 8.57479 3.79743L5.49416 6.87805C5.31107 7.06115 5.0143 7.06115 4.83126 6.87805L1.71548 3.76229C1.53238 3.57924 1.23562 3.57924 1.05252 3.76229Z"
                                  fill="#B2B2B2" />
                        </g>
                        <defs>
                            <clipPath id="clip0_40000240_376">
                                <rect width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(10 0.5) rotate(90)" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            </button>
            <ul class="dropdown-menu">
                <li class="dropdown-texto">
                    <p>
                        ${requ.requ_Descripcion}
                    </p>
                </li>
            </ul>
        </div>
                 `;

        }
    });

    $('#sliderRequisitoHome').append(slider);

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
    $('#seccionHome').append(seccion);
}
function renderTituloCursoHome(curso) {
    const tituloCursoHome = `
     <h2>${curso.curs_Titulo}</h2>
     <div class="red-linear"></div>
      `;
    $('#tituloCursoHome').append(tituloCursoHome);
}
function renderBotonCursoHome(curso) { 
    const botonCursoHome = `      
            <a href="/Curso/Index">${curso.curs_NombreBotonTitulo}</a>
            <img src="${curso.curs_UrlIconBoton}"
                 alt="" />      
      `;
    $('#botonCursoHome').append(botonCursoHome);
}
function renderSliderCursoHome(cursos) {
    let sliderCurso = '';

    cursos.slice(0, 4).forEach(curs => {
        if (curs.curs_Orden > 0) {
            sliderCurso +=
             `
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
                                    <span>Del ${obtenerDia(formatearFechaInversa(curs.curs_FechaInicio))} al ${obtenerDia(formatearFechaInversa(curs.curs_FechaFin))} del ${obtenerAno(formatearFechaInversa(curs.curs_FechaFin))}</span>
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
                                    <a href="${curs.curs_LinkBoton}" class="button_brochure" target="_blank">
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

    $('#sliderCursoHome').append(sliderCurso);
  
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
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2.2,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3.2,
      spaceBetween: 20
    }
  }
});
var swiper = new Swiper(".testomnios_swiper", {
  direction: "horizontal",
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Día con dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const anio = fecha.getFullYear(); // Año completo

    return `${dia}/${mes}/${anio}`; // Cambia el formato según sea necesario
}

function formatearFechaInversa(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Día con dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const anio = fecha.getFullYear(); // Año completo

    return `${anio}-${mes}-${dia}`; // Cambia el formato según sea necesario
}

// Función para obtener el día de una fecha
function obtenerDia(fecha) {
    const fechaObj = new Date(fecha);
    return fechaObj.getDate();
}

// Función para obtener el año de una fecha
function obtenerAno(fecha) {
    const fechaObj = new Date(fecha);
    return fechaObj.getFullYear();
}

function renderSeleccionarVideo() {
    // Escuchar clic en cualquier elemento con la clase "video_item"
    $('.video_item').on('click', function () {
        // Remover la clase "active" de todos los elementos
        $('.video_item').removeClass('active');

        // Agregar la clase "active" al elemento seleccionado
        $(this).addClass('active');

        // Obtener la URL del video (puedes almacenar la URL en un atributo personalizado como "data-video")
        const videoURL = $(this).data('video');

        // Actualizar el iframe con la nueva URL
        $('.exito_video iframe').attr('src', videoURL);
    });
}