$(document).ready(function () {
    console.log('curso web')
    loadListarFormularioContactos();  
    cargarTiposEmpresa();
    cargarRegion();
});
async function loadListarFormularioContactos() {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/FormularioContacto/ListarFormularioContactos",
            dataType: "json",
        });

        console.log("Formulario de contacto:", response);

        limpiarContenedores();

        if (response.success && Array.isArray(response.formularioContactos)) {
            const formularioContactos = response.formularioContactos;

            if (formularioContactos.length > 0) {
                const contacto = formularioContactos[0];

                renderBannerContacto(contacto);
                renderTituloSeccionContacto(contacto);
                renderPoliticaContacto(contacto);
                renderBotonContacto(contacto);
            } else {
                $("#bannerHome").html("<p>No se encontraron formularios de contacto disponibles.</p>");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "No hay formularios disponibles",
                text: response.message || "No se encontraron formularios.",
            });
        }
    } catch (error) {
        console.error("Error al cargar los formularios de contacto:", error);

        Swal.fire({
            icon: "error",
            title: "Error al cargar los formularios",
            text: "Hubo un problema al cargar los formularios de contacto. Inténtelo más tarde.",
        });
    }
}
// Función para limpiar los contenedores
function limpiarContenedores() {
    $("#bannerContacto").empty();
    $("#tituloSeccionContacto").empty();
    $("#politicaContacto").empty();
    $("#botonContacto").empty();
}
function renderBannerContacto(fcon) {
    console.log('fcon secciono', fcon)
    const banner = `    
 <div class="title">${fcon.fcon_Titulo}</div>
        <p class="description">
           ${fcon.fcon_Descripcion}
        </p>
        <div class="location-return align-items-center">
            <a href="#" title="home" class="home-return">
                <img src="${fcon.fcon_UrlImagen}"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;
            <a href="#" title="Calendario"> &nbsp; / Contactanos</a>
        </div>
      `;
    $('#bannerContacto').append(banner);    
}
function renderTituloSeccionContacto(fcon) {
    console.log('fcon secciono', fcon)
    const html = `    
  <h2 class="section_title">${fcon.fcon_TituloSeccion}</h2>
            <div class="red-linear"></div>
      `;
    $('#tituloSeccionContacto').append(html);
}
function renderPoliticaContacto(fcon) {
    console.log('fcon secciono', fcon)
    const html = `    
   Al darle clic en "enviar mensaje"
                                <a href="${fcon.fcon_UrlPoliticas}" class="link-underline-light" target="_blank">acepto la politica de protección de datos personales</a>
      `;
    $('#politicaContacto').append(html);
}
function renderBotonContacto(fcon) {
    console.log('fcon secciono', fcon)
    const html = `    
   
                                 <button type="submit" class="btn btn-primary">
                                   ${fcon.fcon_NombreBotonDos}

                                <svg width="17"
                                     height="16"
                                     viewBox="0 0 17 16"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.08358 8.00008H3.0156M2.87195 8.66442L2.03465 11.1656C1.57607 12.5354 1.34678 13.2203 1.51133 13.6421C1.65422 14.0084 1.96113 14.2861 2.33983 14.3918C2.77592 14.5135 3.43459 14.2171 4.75192 13.6243L13.1972 9.82391C14.4831 9.24525 15.126 8.956 15.3247 8.55408C15.4973 8.20491 15.4973 7.79517 15.3247 7.446C15.126 7.04417 14.4831 6.75483 13.1972 6.17621L4.73736 2.36927C3.42399 1.77826 2.76732 1.48276 2.33166 1.60398C1.95331 1.70926 1.64643 1.98621 1.50304 2.35182C1.33793 2.77281 1.56477 3.45626 2.01846 4.82314L2.87357 7.3995C2.95149 7.63425 2.99046 7.75167 3.00583 7.87167C3.01948 7.97825 3.01934 8.08608 3.00542 8.19258C2.98973 8.31258 2.95047 8.42983 2.87195 8.66442Z"
                                          stroke="white"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round" />
                                </svg>
                            </button>
      `;
    $('#botonContacto').append(html);
}

