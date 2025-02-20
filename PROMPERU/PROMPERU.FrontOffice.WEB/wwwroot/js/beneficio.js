$(document).ready(function () {
  console.log("curso web");
  loadListarBeneficios();
});
function loadListarBeneficios() {
  $.ajax({
    type: "GET", // Método GET para obtener los beneficios
    url: "/Beneficio/ListarBeneficios", // URL del controlador que devuelve la lista de beneficios
    dataType: "json",
    success: function (response) {
      console.log("Respuesta del servidor:", response);

      // Limpia los contenedores antes de renderizar
      $("#bannerBeneficio, #sliderBeneficio").empty();

      // Verificar si la respuesta fue exitosa
      if (!response?.success) {
        Swal.fire({
          icon: "error",
          title: "No hay beneficios disponibles",
          text: response?.message || "No se encontraron beneficios.",
        });
        return; // Detener la ejecución si no hay éxito
      }

      const beneficios = response?.beneficios || [];

      if (beneficios.length > 0) {
        renderBannerBeneficio(beneficios[0]);
        renderSliderBeneficio(beneficios);
      } else {
        $("#sliderBeneficio").html(
          "<p>No se encontraron beneficios disponibles.</p>"
        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en AJAX:", status, error);

      Swal.fire({
        icon: "error",
        title: "Error al cargar los beneficios",
        text: "Hubo un problema al cargar los beneficios. Por favor, inténtelo nuevamente más tarde.",
      });
    },
  });
}
function renderBannerBeneficio(bene) {
  const banner = `    
 <div class="title">${bene.bene_Titulo}</div>
            <p class="description">${bene.bene_Descripcion}</p>
            <div class="location-return align-items-center">
              <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            <a href="#!" title="Calendario" class="text-white text-decoration-none"> &nbsp; / Beneficio</a>
        </div>
      `;
  $("#bannerBeneficio").append(banner);
  cambiarImagenDinamica(bene.bene_URLImagenBanner);
}
function renderSliderBeneficio(beneficios) {
  let slidersHTML = "";
  console.log("seccion Beneficios", beneficios);
  beneficios.forEach((bene, index) => {
    if (bene.bene_Orden > 0) {
      slidersHTML += `
                          <div class="col-12 col-md-6 p-3 beneficio_item">
                    <div class="card rounded-4 overflow-hidden border-0 shadow">
                        <img src="../../shared/assets/beneficios/beneficios_item.png" alt="" class="img-fluid main_card_img">
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

  $("#sliderBeneficio").append(slidersHTML);
}
