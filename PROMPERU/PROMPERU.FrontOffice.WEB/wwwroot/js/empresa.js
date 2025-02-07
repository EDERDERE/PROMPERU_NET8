$(document).ready(function () {
    console.log('curso web')
    loadListarEmpresas();  
    cargarTiposEmpresa();
    cargarRegion();
});

async function loadListarEmpresas() {
    try {
        // Realiza la solicitud AJAX de forma asíncrona
        const response = await $.ajax({
            type: 'GET',
            url: '/Empresa/ListarEmpresas',
            dataType: 'json',
        });

        // Limpia los contenedores antes de renderizar nuevos datos
        clearEmpresaContainers();

        if (response.success) {
            const empresas = response.empresas;
            console.log('Empresas:', empresas);

            if (empresas.length > 0) {
                renderBannerEmpresa(empresas[0]);
                renderSliderEmpresa(empresas);
            } else {
                $('#sliderEmpresaHome').html('<p>No se encontraron Empresas disponibles.</p>');
            }
        } else {
            showErrorMessage(response.message || 'No se encontraron empresas.');
        }

    } catch (error) {
        showErrorMessage('Hubo un problema al cargar las empresas. Por favor, inténtelo nuevamente más tarde.');
    }
}
// Función para limpiar los contenedores de empresas
function clearEmpresaContainers() {
    $('#bannerEmpresa').empty();
    $('#sliderEmpresa').empty();
}
// Función para mostrar mensajes de error con Swal
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
            <div class="location-return align-items-center">
            <a href="#" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;  
            <a href="#" title="Calendario"> &nbsp; / Empresa</a>
        </div>
      `;
    $('#bannerEmpresa').append(html);
   
}

