$(document).ready(function () {
    console.log('Informacion web home')
    loadListarInformacion(); 
});

function loadListarInformacion() {
    $.ajax({
        type: 'GET', // Método GET para obtener los sliders
        url: '/Informacion/ListarInformacions', // URL del controlador que devuelve la lista de sliders
        dataType: 'json',
        success: function (response) {

            console.log(response)
            // Limpia el contenedor de sliders antes de renderizar
            $('#banner').empty();
            $('#seccion').empty();
            if (response.success) {
                const informacions = response.informacions;
                console.log('informacions', informacions[0])
                if (informacions.length > 0) {
                    renderBanner(informacions[0]);   
                    renderSeccion(informacions[0]);  
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

}

function renderBanner(info) {
    const banner = `
     <div class="title">${info.info_Titulo}</div>
        <p class="description">${info.info_Descripcion}</p>

      `;
    $('#banner').append(banner);   
    cambiarImagenDinamica(info.info_URLPortada);
}
function renderSeccion(info) {
    const seccion = `

        <h2 class="text-start title-que-es">${info.info_TituloSeccion}</h2>
        <div class="col-12 col-md-5">
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
      `;
    $('#seccion').append(seccion);
}
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
function cambiarImagenDinamica(imagenUrl) {
    // Usamos jQuery para modificar el background-image
    $(".hero").css("background-image", "url(" + imagenUrl + ")");
}