$(document).ready(function () {
    console.log('curso web')
    loadListarRequisitos();  
});
async function loadListarRequisitos() {
    try {
        const response = await $.ajax({
            type: "GET",
            url: "/Requisito/ListarRequisitos",
            dataType: "json",
        });

        console.log("Respuesta de requisitos:", response);

        limpiarContenedoresRequisitos();

        if (response.success && Array.isArray(response.requisitos)) {
            const requisitos = response.requisitos;

            if (requisitos.length > 0) {
                renderBannerRequisito(requisitos[0]);
                renderTituloRequisito(requisitos[0]); // Corregido el nombre de la función
                renderSliderRequisito(requisitos);
            } else {
                $("#sliderRequisitoHome").html("<p>No se encontraron requisitos disponibles.</p>");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "No hay requisitos disponibles",
                text: response.message || "No se encontraron requisitos.",
            });
        }
    } catch (error) {
        console.error("Error al cargar los requisitos:", error);

        Swal.fire({
            icon: "error",
            title: "Error al cargar los requisitos",
            text: "Hubo un problema al cargar los requisitos. Por favor, inténtelo nuevamente más tarde.",
        });
    }
}
// Función auxiliar para limpiar los contenedores
function limpiarContenedoresRequisitos() {
    $("#banner").empty();
    $("#tituloRequisito").empty();
    $("#sliderRequisito").empty();
}
function renderBannerRequisito(requ) {
    const banner = `
       <div class="title">${requ.requ_Titulo    }</div>
            <p class="description">${requ.requ_Descripcion}</p>
<div class="location-return align-items-center">
            <a href="#" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;
            <a href="#" title="Calendario"> &nbsp; / Requisito</a>
        </div>
      `;
    $('#banner').append(banner);
    cambiarImagenDinamica(requ.requ_URLImagen);
}
function renderTituloRequisito(requ) {

    const tituloRequisito = `
     <h2>${requ.requ_TituloSeccion}</h2>
                    <div class="red-linear"></div>
      `;
    $('#banner').append(banner);    
    $('#tituloRequisito').append(tituloRequisito);
}
function renderSliderRequisito(requisitos) {
    let slidersHTML = '';
    console.log('seccion', requisitos)
    requisitos.forEach((requ,index) => {
        // Comprobar si es par para hacer el diseño reversible
        const isReversed = index % 2 === 0;

        if (requ.requ_Orden > 0) {
            slidersHTML +=
                `
                        <div class="row requisitos_item mt-5">
                ${isReversed ? `
                <div class="col-12 col-md-5 m-0 p-0">
                    <img src="${requ.requ_URLImagen}" alt="" class="img-fluid">
                </div>
                <div class="col-12 col-md-7 bg-white ml-0 requisitos_description p-4">
                    <h3>
                        <img src="${requ.requ_URLIcon}" alt="">
                        ${requ.requ_Nombre || ""}
                    </h3>
                    <p>${requ.requ_Descripcion || ""}</p>
                </div>
                ` : `
                <div class="col-12 col-md-7 bg-white ml-0 requisitos_description p-4 description_left order-1 order-md-0">
                    <h3>
                        <img src="${requ.requ_URLIcon}" alt="">
                        ${requ.requ_Nombre || ""}
                    </h3>
                    <p>${requ.requ_Descripcion || ""}</p>
                </div>
                <div class="col-12 col-md-5 m-0 p-0">
                    <img src="${requ.requ_URLImagen}" alt="" class="img-fluid">
                </div>
                `}
            </div>
              
                              `;
        }
    });

    $('#sliderRequisito').append(slidersHTML);
}

