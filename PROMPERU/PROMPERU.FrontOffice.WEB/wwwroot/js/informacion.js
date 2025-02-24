$(document).ready(function () {
  console.log("Informacion web home");
  loadListarInformacion();
});

async function loadListarInformacion() {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/Informacion/ListarInformacions",
      dataType: "json",
    });

    console.log("Respuesta de informaci�n:", response);

    limpiarContenedoresInfo();

    if (response.success && Array.isArray(response.informacions)) {
      const informacions = response.informacions;

      if (informacions.length > 0) {
        const info = informacions[0];

        renderBannerInfo(info);
        renderSeccionInfo(info);
      } else {
        $("#seccionInfo").html(
          "<p>No hay informaci�n de cursos disponibles.</p>"
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay cursos disponibles",
        text: response.message || "No se encontraron cursos.",
      });
    }
  } catch (error) {
    console.error("Error al cargar la informaci�n:", error);

    Swal.fire({
      icon: "error",
      title: "Error al cargar la informaci�n",
      text: "Hubo un problema al cargar los cursos. Por favor, int�ntelo m�s tarde.",
    });
  }
}

function limpiarContenedoresInfo() {
  $("#banner").empty();
  $("#seccionInfo").empty();
}
function renderBannerInfo(info) {
  console.log(info, "info");
  const banner = `
     <div class="title">${info.info_Titulo}</div>
        <p class="description">${info.info_Descripcion}</p>
<div class="location-return align-items-center">
            <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;
            <a href="#!" title="Calendario"> &nbsp; / Informacion</a>
        </div>
      `;
  $("#banner").append(banner);
  cambiarImagenDinamica(info.info_URLPortada);
}
function renderSeccionInfo(info) {
  const embedUrl = getEmbedUrl(info.info_URLVideo);
  const seccion = `

      <div class="col-12 d-md-none pb-5">
        <div class="video_about rounded-4 overflow-hidden p-0">
            <iframe width="100%"
                    height="100%"
                    src="${embedUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        </div>
    </div>

    <h2 class="text-start section_title mb-3">
        <span class="d-block mb-2">${info.info_TituloSeccion}</span>
        <div class="red-linear"></div>
    </h2>

    <!-- Video en mobile (arriba) -->

    <div class="row">
        <div class="col-12 col-md-5">
            <p class="texto-que-es fs-12 mt-4">
                ${info.info_DescripcionBanner}
            </p>
        </div>

        <!-- Video en desktop (abajo) -->
        <div class="col-12 col-md-7 d-none d-md-block">
            <div class="video_about rounded-4 overflow-hidden p-0">
                <iframe width="100%"
                        height="100%"
                        src="${embedUrl}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        </div>
    </div>
  `;

  $("#seccionInfo").append(seccion);
}
