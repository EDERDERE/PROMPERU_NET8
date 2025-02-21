$(document).ready(function () {
  console.log("curso web");
  loadListarCasos();
});

async function loadListarCasos() {
  try {
    // Realiza la solicitud AJAX
    const response = await $.ajax({
      type: "GET",
      url: "/Caso/ListarCasos",
      dataType: "json",
    });

    // Limpia los contenedores antes de renderizar nuevos datos
    $("#bannerCaso").empty();
    $("#sliderCaso").empty();
    $("#tituloSeccionCaso").empty();

    // Verifica si la respuesta es exitosa
    if (response.success) {
      const casos = response.casos;
      if (casos.length > 0) {
        // Renderiza los casos si hay resultados
        renderBannerCaso(casos[0]);
        renderTituloSeccionCaso(casos[0]);
        renderSliderCaso(casos);
      } else {
        // Si no hay casos, muestra un mensaje
        $("#sliderCaso").html("<p>No se encontraron Casos disponibles.</p>");
      }
    } else {
      // Muestra un mensaje de error si la respuesta no es exitosa
      showErrorMessage(response.message || "No se encontraron casos.");
    }
  } catch (error) {
    // Maneja errores de red o fallos inesperados
    showErrorMessage(
      "Hubo un problema al cargar los casos. Por favor, inténtelo nuevamente más tarde."
    );
  }
}
function renderBannerCaso(caso) {
  const banner = `    
 <div class="title">${caso.cexi_Titulo}</div>
            <p class="description">${caso.cexi_Descripcion}</p>
            <div class="location-return align-items-center">
            <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;  
            <a href="#!" title="Calendario"> &nbsp; / Caso</a>
        </div>
      `;
  $("#bannerCaso").append(banner);
  cambiarImagenDinamica(caso.cexi_UrlCabecera);
}
function renderTituloSeccionCaso(caso) {
  const tituloseccion = `   
     <h2 class="section_title">${caso.cexi_TituloVideo}</h2>
                    <div class="red-linear"></div>
 `;
  $("#tituloSeccionCaso").append(tituloseccion);
}
function renderSliderCaso(casos) {
  let slidersHTML = "";
  casos.forEach((caso, index) => {
    if (caso.cexi_Orden > 0) {
      const embedUrl = getEmbedUrl(caso.cexi_UrlVideo);
      const isOrderReversed = index % 2 !== 0;
      slidersHTML += `
                  <div class="row mt-5">
                ${
                  isOrderReversed
                    ? `
                    <div class="caso-grid col-12 col-md-6 d-flex flex-column justify-content-center align-items-md-end align-items-center order-1 order-md-0">
                        <h3>${caso.cexi_Nombre || "Nombre no disponible"}</h3>
                        <p>${
                          caso.cexi_Descripcion || "Descripción no disponible"
                        }</p>
                    </div>
                `
                    : ""
                }
                <div class="col-12 col-md-6">
                    <iframe class="shadow"
                            width="100%"
                            height="340"
                            src="${embedUrl}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
                ${
                  !isOrderReversed
                    ? `
                    <div class="col-12 caso-grid col-md-6 d-flex flex-column justify-content-center align-items-md-start align-items-center">
                        <h3>${caso.cexi_Nombre || "Nombre no disponible"}</h3>
                        <p>${
                          caso.cexi_Descripcion || "Descripción no disponible"
                        }</p>
                    </div>
                `
                    : ""
                }
            </div>
   
              
                              `;
    }
  });

  $("#sliderCaso").append(slidersHTML);
}
