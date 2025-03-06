$(document).ready(function () {
  loadListarCasos();
});

async function loadListarCasos() {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/Caso/ListarCasos",
      dataType: "json",
    });

    $("#bannerCaso").empty();
    $("#sliderCaso").empty();
    $("#tituloSeccionCaso").empty();

    if (response.success) {
      const casos = response.casos;
      if (casos.length > 0) {
        renderBannerCaso(casos[0]);
        renderTituloSeccionCaso(casos[0]);
        renderSliderCaso(casos);
      } else {
        $("#sliderCaso").html("<p>No se encontraron Casos disponibles.</p>");
      }
    } else {
      showErrorMessage(response.message || "No se encontraron casos.");
    }
  } catch (error) {
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
      const videoId = getEmbedUrl(caso.cexi_UrlVideo);
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
                     <lite-youtube videoid="${videoId}"></lite-youtube>
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
            </div> `;
    }
  });

  $("#sliderCaso").append(slidersHTML);
}
