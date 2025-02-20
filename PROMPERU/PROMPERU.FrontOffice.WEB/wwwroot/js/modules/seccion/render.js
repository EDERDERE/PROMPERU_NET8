import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function renderCallToAction(data) {
  renderTemplate(
    "callToAction",
    (content) => `
      <div class="py-5 bg-white">
          <h2 class="text-center title_init mb-5 mt-5">
              ${content.cint_Titulo} <br><strong>${content.cint_Subtitulo}</strong>
          </h2>
          <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <a href="/Calendario/Index" class="btn button-outline m-0 px-3 py-2  w-md-auto text-center">
                  ${content.cint_NombreBotonTerciario}
                  <img src="${content.cint_UrlIconoBotonPrincipal}" alt="" />
              </a>
              <div class="button-test m-0 px-5 px-md-4  text-center">
                  <a href="#!">${content.cint_NombreBotonSecundario}</a>
                  <img src="${content.cint_UrlIconoBotonSecundario}" alt="" />
              </div>
          </div>
      </div>
    `,
    data
  );
}
