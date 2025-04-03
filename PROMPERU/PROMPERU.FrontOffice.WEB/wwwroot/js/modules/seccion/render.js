import { renderTemplate } from "../../../shared/js/renderTemplate.js";
import { openLink } from "../../utils/openLink.js";

export function renderCallToAction(data) {

  window.openLink = openLink;
  const currentPath = window.location.pathname;

  const isCoursePage = currentPath.includes("/Curso/Index");
  const buttonText = isCoursePage
    ? data.cint_NombreBotonTerciario
    : data.cint_NombreBotonPrincipal;
  const buttonHref = isCoursePage ? "/Calendario/Index" : "/Curso/Index";
  const buttonIcon = isCoursePage
    ? data.cint_UrlIconoBotonTerciario
    : data.cint_UrlIconoBotonPrincipal;

  renderTemplate(
    "callToAction",
    (content) => `
      <div class="py-5 bg-white">
          <h2 class="text-center title_init mb-5 mt-5">
              ${content.cint_Titulo} <br><strong>${content.cint_Subtitulo}</strong>
          </h2>
          <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <a href="${buttonHref}" class="button-outline btn-section text-center">
                  ${buttonText}
                  <img src="${buttonIcon}" alt="" />
              </a>
              <div class="btn-section text-center">
                  <a href="javascript:void(0)" onclick="openLink('/Test/Index')" class="full-button">
                  <div class="button-test">
                  <span>${content.cint_NombreBotonSecundario}</span>
                  <img src="${content.cint_UrlIconoBotonSecundario}" alt="${content.cint_UrlIconoBotonSecundario}" />
                  
                  </div>
                  </a>
              </div>
          </div>
      </div>
    `,
    data
  );
}
