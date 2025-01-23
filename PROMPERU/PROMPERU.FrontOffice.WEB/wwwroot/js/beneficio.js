$(document).ready(function () {
    console.log('curso web')
    loadListarBeneficios();  
});

function loadListarBeneficios() {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Beneficio/ListarBeneficios', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#bannerBeneficio').empty();             
                $('#sliderBeneficio').empty();
                if (response.success) {
                    const beneficios = response.beneficios;
                    console.log('Beneficios beneficios', beneficios)
                    if (beneficios.length > 0) {
                        renderBannerBeneficio(beneficios[0]);                        
                        renderSliderBeneficio(beneficios);
                    } else {
                        $('#sliderBeneficioHome').html('<p>No se encontraron Beneficios disponibles.</p>');
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

function renderBannerBeneficio(bene) {
    console.log('bene',bene)
    const banner = `    
 <div class="title">${bene.bene_Titulo}</div>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn</p>
      `;
    $('#bannerBeneficio').append(banner);
    cambiarImagenDinamica(bene.bene_URLIcon);
}


function renderSliderBeneficio(beneficios) {
    let slidersHTML = '';
    console.log('seccion Beneficios', beneficios)
    beneficios.forEach((bene,index) => {       

        if (bene.bene_Orden > 0) {
            slidersHTML +=
                `
                          <div class="col-12 col-md-6 p-3 beneficio_item">
                    <div class="card rounded-4 overflow-hidden border-0 shadow">
                        <img src="${bene.bene_URLImagen}" alt="" class="img-fluid main_card_img">
                        <div class="content p-4">
                            <h4 class="d-flex align-items-center gap-2">
                                <img src="${bene.bene_URLIcon}" alt="">
                                ${bene.bene_Nombre}
                            </h4>
                            <p>Disfruta de incentivos y ventajas diseñados exclusivamente para empresas graduadas, ayudándote a potenciar tu crecimiento y mantener una ventaja competitiva.</p>
                        </div>
                    </div>
                </div>
              
                              `;
        }
    });

    $('#sliderBeneficio').append(slidersHTML);
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