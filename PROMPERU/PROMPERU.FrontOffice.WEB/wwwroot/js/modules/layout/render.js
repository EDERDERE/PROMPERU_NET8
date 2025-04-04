import { renderTemplate } from "../../../shared/js/renderTemplate.js";
import { openLink } from "../../utils/openLink.js";
import { getCurrentYear } from "../../utils/getCurrentYear.js";

window.openLink = openLink;

export function renderLogo(logo, isMenu = true) {
  renderTemplate(
    "logoHome",
    (data) => `
      <div class="d-flex align-items-center gap-2">
        <img src="${
          data.logo_UrlPrincipal
        }" alt="Logo Superior" class="logo-header"/>
        <span class="separator mx-2 text-white">|</span>
        <img src="${
          data.logo_UrlSecundario
        }" alt="Logo Inferior" class="logo-header"/>
      </div>
      ${
        isMenu
          ? ` <button class="btn btn-transparent d-block d-lg-none text-white" id="openMenu" onclick="openMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <a href="javascript:void(0)" class="btn bg-primary text-white rounded-pill header_btn d-flex align-items-center justify-content-center gap-1 d-none d-lg-block" onclick="openLink('/Test/Index')">
        ${data.logo_NombreBoton}
        <img src="${data.logo_UrlIconBoton}" alt="icono de diagnostico"/>
      </a>`
          : ` `
      } 
    `,
    logo
  );
}

export function renderMenu(menus, logoData) {
  renderTemplate(
    "menuHome",
    (data) => `
      <li class="home">
        <a href="/Home/Index" class="d-flex align-items-center gap-2 text-decoration-none ${
          window.location.pathname.includes("/Home/") ? "active" : ""
        }">
        <?xml version="1.0" ?><svg
                  fill="none"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
          <path
            d="M10.5495 2.53189C11.3874 1.82531 12.6126 1.82531 13.4505 2.5319L20.2005 8.224C20.7074 8.65152 21 9.2809 21 9.94406V19.7468C21 20.7133 20.2165 21.4968 19.25 21.4968H15.75C14.7835 21.4968 14 20.7133 14 19.7468V14.2468C14 14.1088 13.8881 13.9968 13.75 13.9968H10.25C10.1119 13.9968 9.99999 14.1088 9.99999 14.2468V19.7468C9.99999 20.7133 9.2165 21.4968 8.25 21.4968H4.75C3.7835 21.4968 3 20.7133 3 19.7468V9.94406C3 9.2809 3.29255 8.65152 3.79952 8.224L10.5495 2.53189ZM12.4835 3.6786C12.2042 3.44307 11.7958 3.44307 11.5165 3.6786L4.76651 9.37071C4.59752 9.51321 4.5 9.72301 4.5 9.94406V19.7468C4.5 19.8849 4.61193 19.9968 4.75 19.9968H8.25C8.38807 19.9968 8.49999 19.8849 8.49999 19.7468V14.2468C8.49999 13.2803 9.2835 12.4968 10.25 12.4968H13.75C14.7165 12.4968 15.5 13.2803 15.5 14.2468V19.7468C15.5 19.8849 15.6119 19.9968 15.75 19.9968H19.25C19.3881 19.9968 19.5 19.8849 19.5 19.7468V9.94406C19.5 9.72301 19.4025 9.51321 19.2335 9.37071L12.4835 3.6786Z"
            fill="currentColor"
          />
          </svg>
          <span class="d-block d-lg-none">Inicio</span>
        </a>
      </li>
      ${data.menus
        .map(
          (item) => `
        <li>
          <a href="${
            item.menu_UrlIconBoton || "#"
          }" class="text-decoration-none ${
            window.location.pathname.includes(item.menu_UrlIconBoton)
              ? "active"
              : ""
          }">
            ${item.menu_Nombre}
          </a>
        </li>
      `
        )
        .join("")}

      <a href="javascript:void(0)"  onclick="openLink('/Test/Index')" class="btn bg-primary text-white rounded-pill header_btn d-flex align-items-center justify-content-center gap-1 d-block d-lg-none">
        ${data.logoData.logo_NombreBoton}
        <img src="${
          data.logoData.logo_UrlIconBoton
        }" alt="icono de diagnostico">
      </a>
    `,
    { menus, logoData }
  );
}

export function renderFooter(foot) {
  renderTemplate(
    "footerHome",
    (data) => `
        <div class="logo_footer">
        <div class="container py-3">
          <img src="${
            data.foot_UrlLogoPrincipal
          }" alt="Logo Principal" class="img-fluid">
        </div>
      </div>
      <div class="logo_content">
          <div class="container pt-4 pb-5">
        <div class="row">
          <div class="col-12 col-md-8 text-white">
            <h4 class="mb-3 fs-5">${data.foot_Nombre}</h4>
            <p class="d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg>
              ${data.foot_Contacto}
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
              ${data.foot_Ubicacion}
            </p>
          </div>
          <div class="help-section col-12 col-md-4 text-white ">
          <div class="help">
            <strong >${data.foot_Ayuda}</strong>
            <p class="mb-3">Comunícate con nosotros</p>
          </div>
            <div class="d-flex gap-3  mb-5">
              <a href="#" class="text-white text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
              </a>
              <a href="#" class="text-white text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between footer pt-3">
            <p class="text-white ">Copyright ${getCurrentYear()} PROMPERÚ</p>
            <div class="logo_ministerio">
              <img src="${
                data.foot_UrlLogoSecundario
              }" alt="Logo Secundario" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
      </div>
    `,
    foot
  );
}
