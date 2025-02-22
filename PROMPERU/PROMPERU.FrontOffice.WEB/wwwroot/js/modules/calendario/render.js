import { renderTemplate } from "../../../shared/js/renderTemplate.js";

export function renderBannerCalendario(calendar) {
  renderTemplate(
    "bannerCalendario",
    (data) => `
      <div class="title">${data.curs_TituloCalendario}</div>
      <p class="description">${data.curs_DescripcionCalendario}</p>
      <div class="location-return align-items-center">
          <a href="/Home/Index" title="home" class="home-return">
              <img src="../../shared/assets/contactanos/home.svg" alt="home" class="image-home" />
          </a>
          &nbsp;
          <a href="#!" title="Calendario"> &nbsp; / Calendario</a>
      </div>
    `,
    calendar,
  );

  cambiarImagenDinamica(calendar.curs_UrlImagen);
}

export function loadCalendar(cursos) {
  console.log(cursos);
  const eventos = Object.groupBy(cursos, function() { });
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    events: cursos,
    eventClick: function(info) {
      openModal(
        info.event.title,
        info.event.extendedProps.tipo,
        info.event.extendedProps.descripcion,
        info.event.extendedProps.modalidad,
      );
    },
  });
  calendar.render();
}

export function renderEventCards(cursos) {

  $('#event-pagination').pagination({
    dataSource: cursos,
    pageSize: 4,
    showPrevious: true,
    showNext: true,
    callback: function(data, pagination) {
        // template method of yourself
        console.log(pagination)
        var html = template(data);
        $('#event-grid').html(html);
    }
})
}

function template(data) {
  let eventItems = "";
  data.forEach((element) => {
    console.log(element);
    const dateSplit = element.start.split("-");
    const day = dateSplit[2];
    const month = dateSplit[1];
    const year = dateSplit[0];

    const date = new Date(`${month}/${day}/${year}`);
    const monthStr = date.toLocaleString("es-ES", {
      month: "long",
    });
    console.log(monthStr);
    eventItems += `<div class="event_item cursor-pointer" id="evento" data-titulo="${element.title}" data-tipo="${element.tipo}" data-descripcion="${element.descripcion}" data-descripcion2="${element.descripcion2}">
                      <div class="day_tag">
                        <div class="calendar_icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-calendar-week"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
                            />
                            <path
                              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                            />
                          </svg>
                        </div>
                        <span class="event_day_number">${day}</span>
                        <span class="event_month text-capitalize">${monthStr}</span>
                      </div>
                      <p class="text-primary">${element.tipo}</p>
                      <p>${element.descripcion}</p>
                      <p class="text-primary">${element.title}</p>
                      <p>${element.modalidad}</p>
                      <span class="line"></span>
                    </div>
`;
  });

  return eventItems;
}

export function initCalendarViews() {
  const calendarOption = document.getElementById("option-calendario");
  const gridOption = document.getElementById("option-grid");
  const calendarView = document.getElementById("calendar-view");
  const gridView = document.getElementById("grid-view");

  calendarOption.addEventListener("click", function() {
    gridView.style.display = "none";
    calendarView.style.display = "block";
    calendarOption.classList.add("active");
    gridOption.classList.remove("active");
  });
  gridOption.addEventListener("click", function() {
    gridView.style.display = "block";
    calendarView.style.display = "none";
    calendarOption.classList.remove("active");
    gridOption.classList.add("active");
  });

  addOpenModalEvent();
}

function addOpenModalEvent() {
  const modal = document.getElementById("event-modal");
  modal.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
  });
}

function openModal(titulo, tipo, descripcion, descripcion2) {
  const modal = document.getElementById("event-modal");
  modal.querySelector(".modal_titulo").innerText = titulo;
  modal.querySelector(".modal_tipo").innerText = tipo;
  modal.querySelector(".modal_descripcion").innerText = descripcion;
  modal.querySelector(".modal_descripcion2").innerText = descripcion2;
  modal.style.display = "flex";
}

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {});
};
