$(document).ready(function () {
    console.log('curso web')
    loadListarEmpresas();  
    cargarTiposEmpresa();
    cargarRegion();
});

function loadListarEmpresas() {
        $.ajax({
            type: 'GET', // Método GET para obtener los sliders
            url: '/Empresa/ListarEmpresas', // URL del controlador que devuelve la lista de sliders
            dataType: 'json',
            success: function (response) {

                console.log(response)
                // Limpia el contenedor de sliders antes de renderizar
                $('#bannerEmpresa').empty();             
                $('#sliderEmpresa').empty();
                if (response.success) {
                    const empresas = response.empresas;
                    console.log('Empresas Empresas', empresas)
                    if (empresas.length > 0) {
                        renderBannerEmpresa(empresas[0]);                        
                       renderSliderEmpresa(empresas);
                    } else {
                        $('#sliderEmpresaHome').html('<p>No se encontraron Empresas disponibles.</p>');
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
function renderSliderEmpresa(empresas) {
    let slidersHTML = '';
    console.log('empresas', empresas)
    empresas.forEach(egra => {
        if (egra.egra_Orden > 0) {
            slidersHTML +=
                `
                                <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
                    <img src="${egra.egra_UrlLogo}" alt="" class="img-fluid mb-4">
                    <h4>${egra.egra_NombreEmpresa}</h4>
                    <a href="mailto:info@destinosperu.com">${egra.egra_Correo}</a>
                    <span>${egra.egra_Descripcion}</span>
                </div>
              
                              `;
        }
    });

    $('#sliderEmpresa').append(slidersHTML);
}
function renderBannerEmpresa(egra) {
    console.log('Egr', egra)
    const html = `    
  <div class="title">${egra.egra_Titulo}</div>
            <p class="description">${egra.egra_Descripcion}</p>
      `;
    $('#bannerEmpresa').append(html);
   
}

function cargarRegion() {
    $.ajax({
        url: "/Empresa/ListarRegiones", // Ruta del controlador
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log('lista region', data)
            var select = $("#inputRegion");
            select.empty(); // Limpiar opciones previas
            select.append('<option selected>seleccione a su región</option>');

            $.each(data.regions, function (index, item) {
                select.append($('<option>', {
                    value: item.regi_ID,
                    text: item.regi_Nombre
                }));
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los tipos de empresa:", error);
        }
    });
}
function cargarTiposEmpresa() {
    $.ajax({
        url: "/Empresa/ListarTipoEmpresas", // Ruta del controlador
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log('lista tipo empresa', data)
            var select = $("#inputTipoEmpresa");
            select.empty(); // Limpiar opciones previas
            select.append('<option selected>Seleccione su tipo</option>');

            $.each(data.tipoEmpresas, function (index, item) {
                select.append($('<option>', {
                    value: item.temp_ID,
                    text: item.temp_Nombre
                }));
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los tipos de empresa:", error);
        }
    });
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