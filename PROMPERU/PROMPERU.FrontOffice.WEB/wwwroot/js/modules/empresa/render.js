import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function renderBannerEmpresa(empresa) {
  

  renderTemplate(
    "bannerEmpresa",
    (data) => `
      <div class="title">${data.egra_NombreEmpresa}</div>
      <p class="description">${data.egra_Descripcion}</p>
      <div class="location-return align-items-center">
          <a href="/Home/Index" title="home" class="home-return">
              <img src="../../shared/assets/contactanos/home.svg" alt="home" class="image-home" />
          </a>
          &nbsp;
          <a href="#!" title="Empresas"> &nbsp; / Empresas</a>
      </div>
    `,
    empresa
  );

  cambiarImagenDinamica(empresa.egra_Imagen);
}

export function renderSliderEmpresa(empresas) {
  $("#empresas-pagination").pagination({
    dataSource: empresas,
    pageSize: 7,
    showPrevious: true,
    showNext: true,
    callback: function(data, pagination) {
      template(data);
    },
  });
}

function template(empresas){
  renderTemplate(
    "sliderEmpresa",
    (data) =>
      data
        .filter((egra) => egra.egra_Orden > 0)
        .map(
          (egra) => `
          <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
              <img src="${egra.egra_UrlLogo}" alt="" class="img-fluid mb-4">
              <h4>${egra.egra_NombreEmpresa}</h4>
              <a href="mailto:${egra.egra_Correo}">${egra.egra_Correo}</a>
              <span>${egra.egra_Descripcion}</span>
              <span>${egra.egra_Correo}</span>
              <span>${egra.egra_RUC}</span>
              <span>${egra.tipoEmpresa}</span>
              <span>${egra.egra_RazonSocial}</span>
              <span>${egra.egra_RUC}</span>
              <span>${egra.egra_Mercados}</span>
              <span>${egra.egra_Certificaciones}</span>
              <span>${egra.egra_Direccion}</span>
              <span>${egra.region}</span>
              <span>${egra.egra_PaginaWeb}</span>
              <span>${egra.egra_RedesSociales}</span>
              <span>${egra.egra_SegmentosAtendidos}</span>
              <span>${egra.egra_Titulo}</span>
          </div>
        `
        )
        .join(""),
    empresas
  );
}