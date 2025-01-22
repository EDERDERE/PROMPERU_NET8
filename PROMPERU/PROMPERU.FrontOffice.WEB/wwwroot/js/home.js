$(document).ready(function () {
    console.log('curso web home')
    loadListarCursos();
    loadListarInformacion();
});

function loadListarInformacion() {
    $.ajax({
        type: 'GET', // M�todo GET para obtener los sliders
        url: '/Informacion/ListarInformacions', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar        
            $('#seccion').empty();
            if (response.success) {
                const informacions = response.informacions;
                console.log('informacions', informacions[0])
                if (informacions.length > 0) {
                    renderBanner(informacions[0]);
                    renderSeccion(informacions[0]);
                } else {
                    $('#seccion').html('<p>No se informaci�n cursos disponibles.</p>');
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
                text: 'Hubo un problema al cargar los cursos. Por favor, int�ntelo nuevamente m�s tarde.',
            });
        }
    });

}
function renderSeccion(info) {
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
    $('#seccion').append(seccion);
}
function loadListarCursos() {
    $.ajax({
        type: 'GET', // M�todo GET para obtener los sliders
        url: '/Curso/ListarCursos', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar
            $('#tituloCurso').empty();
            $('#botonCurso').empty();
            $('#sliderCurso').empty();
            if (response.success) {
                const cursos = response.cursos;
                console.log('cursos', cursos)
                if (cursos.length > 0) {
                    renderTituloCurso(cursos[0]);
                    renderBotonCurso(cursos[0]);
                    renderSliderCurso(cursos);
                } else {
                    $('#sliderContainer').html('<p>No se encontraron cursos disponibles.</p>');
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
                text: 'Hubo un problema al cargar los cursos. Por favor, int�ntelo nuevamente m�s tarde.',
            });
        }
    });

}
function renderTituloCurso(curso) {
    const tituloCurso = `
     <h2>${curso.curs_Titulo}</h2>
     <div class="red-linear"></div>
      `;
    $('#tituloCurso').append(tituloCurso);
}
function renderBotonCurso(curso) {
    const botonCurso = `      
            <a href="@Url.Action("Index", "Curso")">${curso.curs_NombreBotonTitulo}</a>
            <img src="${curso.curs_UrlIconBoton}"
                 alt="" />      
      `;
    $('#botonCurso').append(botonCurso);
}
function renderSliderCurso(cursos) {
    let sliderCurso = '';

    cursos.slice(0, 4).forEach(curso => {
        if (curso.curs_Orden > 0) {
            sliderCurso +=
             `
                <div class="swiper-slide p-3">
                    <div class="card rounded-4 overflow-hidden border-0 shadow-md">
                        <img src="${curso.curs_UrlImagen}" alt="">
                            <div class="content p-3">
                                <h4>Inovacion</h4>
                                <p class="curso_description">orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula</p>
                                <p class="d-flex align-items-center gap-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0070BA" class="bi bi-calendar4-week" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <strong>Virtual en Vivo:</strong>
                                    <span>Del ${obtenerDia(formatearFechaInversa(curso.curs_FechaInicio))} al ${obtenerDia(formatearFechaInversa(curso.curs_FechaFin))} del ${obtenerAno(formatearFechaInversa(curso.curs_FechaFin))}</span>
                                </p>
                                <p class="d-flex align-items-center gap-1  mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0070BA" class="bi bi-clock-history" viewBox="0 0 16 16">
                                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                    <strong>A tu ritmo:</strong>
                                    <span>${curso.curs_Modalidad}</span>
                                </p>
                                <div class="d-flex justify-content-center">
                                    <a href="${curso.curs_UrlIcon}" class="button_brochure" target="_blank">
                                        Descargar brochure
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

    $('#sliderCurso').append(sliderCurso);
  
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
    const dia = String(fecha.getDate()).padStart(2, '0'); // D�a con dos d�gitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos d�gitos
    const anio = fecha.getFullYear(); // A�o completo

    return `${dia}/${mes}/${anio}`; // Cambia el formato seg�n sea necesario
}

function formatearFechaInversa(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // D�a con dos d�gitos
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes con dos d�gitos
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