import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function renderContacto(contacto) {
  renderTemplate(
    "bannerContacto",
    (data) => `
      <div class="title">${data.fcon_Titulo}</div>
        <p class="description">
           ${data.fcon_Descripcion}
        </p>
        <div class="location-return align-items-center">
            <a href="/Home/Index" title="home" class="home-return">
                <img src="../../shared/assets/contactanos/home.svg"
                     alt="home"
                     class="image-home" />
            </a>
            &nbsp;
            <a href="#!" > &nbsp; / Contactanos</a>
        </div>
    `,
    contacto
  );
  cambiarImagenDinamica(contacto.fcon_UrlImagen);

  renderTemplate(
    "tituloSeccionContacto",
    (data) => `
      <h2 class="section_title">${data.fcon_TituloSeccion}</h2>
      <div class="red-linear"></div>
    `,
    contacto
  );

  renderTemplate(
    "politicaContacto",
    (data) => `    
   Al darle clic en "enviar mensaje"
  <a href="${data.fcon_UrlPoliticas}" class="link-underline-light" target="_blank">acepto la politica de protección de datos personales</a>
      `,
    contacto
  );

  renderTemplate(
    "botonContacto",
    (data) => `
     <button type="submit" class="btn btn-primary">
            ${data.fcon_NombreBotonDos}

        <svg width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
            <path d="M8.08358 8.00008H3.0156M2.87195 8.66442L2.03465 11.1656C1.57607 12.5354 1.34678 13.2203 1.51133 13.6421C1.65422 14.0084 1.96113 14.2861 2.33983 14.3918C2.77592 14.5135 3.43459 14.2171 4.75192 13.6243L13.1972 9.82391C14.4831 9.24525 15.126 8.956 15.3247 8.55408C15.4973 8.20491 15.4973 7.79517 15.3247 7.446C15.126 7.04417 14.4831 6.75483 13.1972 6.17621L4.73736 2.36927C3.42399 1.77826 2.76732 1.48276 2.33166 1.60398C1.95331 1.70926 1.64643 1.98621 1.50304 2.35182C1.33793 2.77281 1.56477 3.45626 2.01846 4.82314L2.87357 7.3995C2.95149 7.63425 2.99046 7.75167 3.00583 7.87167C3.01948 7.97825 3.01934 8.08608 3.00542 8.19258C2.98973 8.31258 2.95047 8.42983 2.87195 8.66442Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
        </svg>
    </button>
    `,
    contacto
  );

  renderTemplate(
    "descripcionContacto",
    (data) => `
      <div class="title">
          <h3>${data.fcon_SubTitulo}</h3>
          <p class="fs-5">${data.fcon_DescripcionSubTitulo}</p>
          <p class="d-flex align-items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <span>${data.fcon_Direccion}</span>
          </p>
      </div>
    `,
    contacto
  );

  renderTemplate(
    "dataContacto",
    (data) => `
                <h3 class="mb-4">${data.fcon_SubTituloDos}</h3>
                <p class="d-flex align-items-center gap-2 mb-4">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <span> Correo: </span>
                    </strong>
                    <span>
                       ${data.fcon_Correo}
                    </span>
                </p>
                <p class="d-flex align-items-center gap-2 mb-4">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        <span> Celular: </span>
                    </strong>
                    <span>
                        ${data.fcon_Telefono}
                    </span>
                </p>
                <p class="d-flex align-items-center gap-2 mb-4">
                    <strong class="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        <span>  Horario: </span>
                    </strong>
                    <span>
                         ${data.fcon_Horario}
                    </span>
                </p>

                <div class="btn-test">
                    <div class="button-test">
                        <a href="/FormularioContacto/Index">${data.fcon_NombreBoton}</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                </div>
    `,
    contacto
  );
}
