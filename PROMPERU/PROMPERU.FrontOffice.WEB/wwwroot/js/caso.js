$(document).ready(function () {
    console.log('curso web')
    loadListarCasos();  
});

function loadListarCasos() {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Caso/ListarCasos', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#bannerCaso').empty();             
                $('#sliderCaso').empty();
                $('#tituloSeccionCaso').empty();
                if (response.success) {
                    const casos = response.casos;
                    console.log('Casos Casos', casos)
                    if (casos.length > 0) {
                        renderBannerCaso(casos[0]);     
                        renderTituloSeccionCaso(casos[0]);  
                        renderSliderCaso(casos);
                    } else {
                        $('#sliderCaso').html('<p>No se encontraron Casos disponibles.</p>');
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

function renderBannerCaso(caso) {
    console.log('caso',caso)
    const banner = `    
 <div class="title">${caso.cexi_Titulo}</div>
            <p class="description">${caso.cexi_Descripcion}</p>
      `;
    $('#bannerCaso').append(banner);
    cambiarImagenDinamica(caso.cexi_UrlCabecera);
}
function renderTituloSeccionCaso(caso) {
    console.log('bene', caso)
    const tituloseccion = `   
     <h2>${caso.cexi_TituloVideo}</h2>
                    <div class="red-linear"></div>
 `;
    $('#tituloSeccionCaso').append(tituloseccion);
    
}
function renderSliderCaso(casos) {
    let slidersHTML = '';
    console.log('seccion Casos', casos)
    casos.forEach((caso,index) => {       

        if (caso.cexi_Orden > 0) {
            const isOrderReversed = index % 2 !== 0;
            slidersHTML +=
                `
                  <div class="row mt-5">
                ${isOrderReversed ? `
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-md-end align-items-center order-1 order-md-0">
                        <h3>${caso.cexi_Nombre || "Nombre no disponible"}</h3>
                        <p>${caso.cexi_Descripcion || "Descripción no disponible"}</p>
                    </div>
                ` : ""}
                <div class="col-12 col-md-6">
                    <iframe class="shadow"
                            width="100%"
                            height="340"
                            src="${caso.cexi_UrlVideo}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
                ${!isOrderReversed ? `
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-md-start align-items-center">
                        <h3>${caso.cexi_Nombre || "Nombre no disponible"}</h3>
                        <p>${caso.cexi_Descripcion || "Descripción no disponible"}</p>
                    </div>
                ` : ""}
            </div>
   
              
                              `;
        }
    });

    $('#sliderCaso').append(slidersHTML);
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