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
    callback: function (data, pagination) {
      template(data);
    },
  });
}
function template(empresas) {
  const empresasFiltradas = empresas.filter((egra) => egra.egra_Orden > 0);
  if (empresasFiltradas.length === 0) {
    $("#sliderEmpresa").hide();
    return;
  }

  $("#sliderEmpresa").show();

  renderTemplate(
    "sliderEmpresa",
    (data) =>
      data
        .filter((egra) => egra.egra_Orden > 0)
        .map((egra) => {
          let redesSociales = [
            egra.egra_RedesSociales,
            egra.egra_RedesSocialesDos,
            egra.egra_RedesSocialesTres,
            egra.egra_RedesSocialesCuatro,
          ].filter((red) => red && red.trim() !== "");

          return `
          <div class="card border-0 shadow rounded-4 p-3 graduated_companies_item">
              ${
                egra.egra_UrlLogo
                  ? `<img src="${egra.egra_UrlLogo}" alt="${egra.egra_NombreEmpresa}" class="img-fluid mb-4">`
                  : ""
              }
              ${
                egra.egra_NombreEmpresa
                  ? `<h4>${egra.egra_NombreEmpresa}</h4>`
                  : ""
              }

              ${renderField("Correo", egra.egra_Correo, true)}
              ${renderField("Descripción", egra.egra_Descripcion)}
              ${renderField("RUC", egra.egra_RUC)}
              ${renderField("Tipo de Empresa", egra.tipoEmpresa)}
              ${renderField("Razón Social", egra.egra_RazonSocial)}
              ${renderField("Mercados", egra.egra_MercadosSegmentosAtendidos)}
              ${renderField("Certificaciones", egra.egra_Certificaciones)}
              ${renderField("Dirección", egra.egra_Direccion)}
              ${renderField("Región", egra.region)}
              ${renderField("Página Web", egra.egra_PaginaWeb, true)}

              ${renderSocialMediaList(redesSociales)}

              ${renderField(
                "Segmentos Atendidos",
                egra.egra_SegmentosAtendidos
              )}
              ${renderField("Título", egra.egra_Titulo)}
          </div>
          `;
        })
        .join(""),
    empresas
  );
}

const renderField = (label, value, isLink = false) => {
  if (!value || value.trim() === "") return "";

  return isLink
    ? `<p><strong>${label}:</strong> <a href="${value}" target="_blank">${value}</a></p>`
    : `<p><strong>${label}:</strong> ${value}</p>`;
};

const renderSocialMediaList = (redesSociales) => {
  if (redesSociales.length === 0) return ""; // No renderiza nada si no hay redes

  return `
    <p><strong>Redes Sociales:</strong></p>
    <ul>
      ${redesSociales
        .map((red) => `<li><a href="${red}" target="_blank">${red}</a></li>`)
        .join("")}
    </ul>
  `;
};
