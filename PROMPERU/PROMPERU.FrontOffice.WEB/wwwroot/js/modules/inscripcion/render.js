import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function renderInscription(inscriptions) {
  const firstInscription = inscriptions[0];

  renderTemplate(
    "tituloInscription",
    (data) => `
    <h2 class="text-start section_title">${data.insc_Titulo}</h2>
  `,
    firstInscription
  );

  renderTemplate(
    "descrInscription",
    (data) => data.insc_Contenido,
    firstInscription
  );

  renderTemplate(
    "botonInsciption",
    (data) => `
    <a href="/Test/Index" class="full-button">
      <div class="button-test">
        <span>${data.insc_NombreBoton}</span>
        <img src="${data.insc_URLIconBoton}" alt="${data.insc_NombreBoton}" />
      </div>
    </a>
  `,
    firstInscription
  );

  renderTemplate(
    "sliderInscription",
    (data) =>
      data
        .filter((insc) => insc.insc_Orden >= 1)
        .map(
          (insc, index) => `
          <div class="step">
            <div class="step-image">
              <img src="${insc.insc_URLImagen}" alt="Paso ${insc.insc_Paso}" />
            </div>
             <div class="step-content ${
               index % 2 !== 0 ? "left-align" : "right-align"
             }">
              <p class="step-indicator">PASO ${insc.insc_Paso}</p>
              <h3 class="step-title">${insc.insc_TituloPaso}</h3>
              <p class="p-p">${insc.insc_Descripcion}</p>
            </div>
          </div>
        `
        )
        .join(""),
    inscriptions
  );

  renderTemplate(
    "bannerInscription",
    () => `
           <div class="title">${firstInscription.insc_Titulo}</div>
            <p class="description">${firstInscription.insc_Descripcion}</p>
            <div class="location-return align-items-center">
            <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg" alt="home" class="image-home" />
            </a>
            &nbsp;
            <a href="#!" title="Calendario"> &nbsp; / Inscripción</a>
        </div>
    `,
    firstInscription
  );

  cambiarImagenDinamica(firstInscription.insc_URLImagen);
}
