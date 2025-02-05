$(document).ready(function () {
    console.log('Informacion web home')
    loadListarInformacion(); 
});
async function loadListarInformacion() {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Informacion/ListarInformacions",
            dataType: "json",
        });

        console.log("Respuesta de información:", response);

        limpiarContenedoresInfo();

        if (response.success && Array.isArray(response.informacions)) {
            const informacions = response.informacions;

            if (informacions.length > 0) {
                const info = informacions[0];

                renderBannerInfo(info);
                renderSeccionInfo(info);
            } else {
                $("#seccionInfo").html("<p>No hay información de cursos disponibles.</p>");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "No hay cursos disponibles",
                text: response.message || "No se encontraron cursos.",
            });
        }
    } catch (error) {
        console.error("Error al cargar la información:", error);

        Swal.fire({
            icon: "error",
            title: "Error al cargar la información",
            text: "Hubo un problema al cargar los cursos. Por favor, inténtelo más tarde.",
        });
    }
}
// Función para limpiar los contenedores antes de renderizar nueva información
function limpiarContenedoresInfo() {
    $("#banner").empty();
    $("#seccionInfo").empty();
}
function renderBannerInfo(info) {
    console.log(info,'info')
    const banner = `
     <div class="title">${info.info_Titulo}</div>
        <p class="description">${info.info_Descripcion}</p>

      `;
    $('#banner').append(banner);   
    cambiarImagenDinamica(info.info_URLPortada);
}
function renderSeccionInfo(info) {
    console.log('aaaaaaa',info,'ingreso a la seccion')
    const seccion = `

        <h2 class="text-start title-que-es">${info.info_TituloSeccion}</h2>
        <div class="col-12 col-md-5">
            <div class="red-linear"></div>
            <p class="texto-que-es fs-12 mt-4">
                ${info.info_Descripcion}
            </p>
        </div>
        <div class="col-12 col-md-7">
            <div class="video_about rounded-3 overflow-hidden p-0">
                <iframe width="100%"
                        height="100%"
                        src="${info.info_URLVideo}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        </div>
      `;
    $('#seccionInfo').append(seccion);
}
