$(document).ready(function () {
    console.log('curso web')
    loadListarRequisitos();  
});

function loadListarRequisitos() {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Requisito/ListarRequisitos', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#banner').empty();
                $('#tituloRequisito').empty();
                $('#sliderRequisito').empty();
                if (response.success) {
                    const requisitos = response.requisitos;
                    console.log('requisitos', requisitos)
                    if (requisitos.length > 0) {
                        renderBanner(requisitos[0]);
                        rederTituloRequisito(requisitos[0]);
                        renderSliderRequisito(requisitos);
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
    
}

function renderBanner(requ) {
    const banner = `
       <div class="title">${requ.requ_Titulo    }</div>
            <p class="description">${requ.requ_Descripcion}</p>

      `;
    $('#banner').append(banner);
    cambiarImagenDinamica(requ.requ_URLImagen);
}

function rederTituloRequisito(requ) {

    const tituloRequisito = `
     <h2>${requ.requ_TituloSeccion}</h2>
                    <div class="red-linear"></div>
      `;
    $('#banner').append(banner);    
    $('#tituloRequisito').append(tituloRequisito);
}

function renderSliderRequisito(requisitos) {
    let slidersHTML = '';
    console.log('seccion', requisitos)
    requisitos.forEach((requ,index) => {
        // Comprobar si es par para hacer el diseño reversible
        const isReversed = index % 2 === 0;

        if (requ.requ_Orden > 0) {
            slidersHTML +=
                `
                        <div class="row requisitos_item mt-5">
                ${isReversed ? `
                <div class="col-12 col-md-5 m-0 p-0">
                    <img src="${requ.requ_URLImagen}" alt="" class="img-fluid">
                </div>
                <div class="col-12 col-md-7 bg-white ml-0 requisitos_description p-4">
                    <h3>
                        <img src="${requ.requ_URLIcon}" alt="">
                        ${requ.requ_Nombre || ""}
                    </h3>
                    <p>${requ.requ_Descripcion || ""}</p>
                </div>
                ` : `
                <div class="col-12 col-md-7 bg-white ml-0 requisitos_description p-4 description_left order-1 order-md-0">
                    <h3>
                        <img src="${requ.requ_URLIcon}" alt="">
                        ${requ.requ_Nombre || ""}
                    </h3>
                    <p>${requ.requ_Descripcion || ""}</p>
                </div>
                <div class="col-12 col-md-5 m-0 p-0">
                    <img src="${requ.requ_URLImagen}" alt="" class="img-fluid">
                </div>
                `}
            </div>
              
                              `;
        }
    });

    $('#sliderRequisito').append(slidersHTML);
}








// Función para formatear la fecha
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

function cambiarImagenDinamica(imagenUrl) {
    // Usamos jQuery para modificar el background-image
    $(".hero").css("background-image", "url(" + imagenUrl + ")");
}