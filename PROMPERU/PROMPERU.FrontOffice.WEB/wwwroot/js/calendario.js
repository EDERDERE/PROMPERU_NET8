const calendarOption = document.getElementById("option-calendario");
const gridOption = document.getElementById("option-grid");
const calendarView = document.getElementById("calendar-view");
const gridView = document.getElementById("grid-view");

calendarOption.addEventListener("click", function () {
  gridView.style.display = "none";
  calendarView.style.display = "block";
  calendarOption.classList.add("active");
  gridOption.classList.remove("active");
});
gridOption.addEventListener("click", function () {
  gridView.style.display = "block";
  calendarView.style.display = "none";
  calendarOption.classList.remove("active");
  gridOption.classList.add("active");
});

const monthYear = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
const weekdaysContainer = document.getElementById("weekdays");
let currentDate = new Date();

const eventos = [
  {
    fecha: "1/2/2025",
    tipo: "Inovacion",
    descripcion: "Hola mundo",
    titulo: "Marketing Digital",
    descripcion2: "Hola mundo 2",
  },
  {
    fecha: "1/2/2025",
    tipo: "Inovacion",
    descripcion: "Hola mundo",
    titulo: "Marketing Digital",
    descripcion2: "Hola mundo 2",
  },
  {
    fecha: "5/2/2025",
    tipo: "Inovacion",
    descripcion: "Hola mundo",
    titulo: "Marketing Digital",
    descripcion2: "Hola mundo 2",
  },
];

const weekdays = ["L", "M", "X", "J", "V", "S", "D"];

function generateWeekdays() {
  weekdaysContainer.innerHTML = "";
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    weekdaysContainer.appendChild(dayElement);
  });
}

function generateCalendar(date) {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = date.toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = firstDay; i > 0; i--) {
    const prevMonthCell = document.createElement("div");
    prevMonthCell.classList.add("day", "empty");
    prevMonthCell.innerHTML = `<span class="day_number">${daysInPrevMonth - i + 1}</span>`;
    calendarGrid.appendChild(prevMonthCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    const dayToEvaluate = `${day}/${month + 1}/${year}`;
    let eventItems = "";

    const dayWidthEvents = eventos.filter(
      (evento) => evento.fecha == dayToEvaluate,
    );

    if (dayWidthEvents.length) {
      dayCell.classList.add("hasEvents");
      dayWidthEvents.forEach((element) => {
        eventItems += `<span class="event" id="evento" data-titulo="${element.titulo}" data-tipo="${element.tipo}" data-descripcion="${element.descripcion}" data-descripcion2="${element.descripcion2}">${element.titulo}</span>`;
      });
    }

    dayCell.classList.add("day");
    dayCell.innerHTML = `<span class="day_number">${day}</span> ${eventItems}`;
    calendarGrid.appendChild(dayCell);
  }

  const remainingDays = 42 - (firstDay + daysInMonth);
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthCell = document.createElement("div");
    nextMonthCell.classList.add("day", "empty");
    nextMonthCell.innerHTML = `<span class="day_number">${i}</span>`;
    calendarGrid.appendChild(nextMonthCell);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
}

function generateEvents() {
  const grid = document.getElementById("event-grid");
  let eventItems = "";
  eventos.forEach((element) => {
    const dateSplit = element.fecha.split("/");
    const day = dateSplit[0];
    const month = dateSplit[1];
    const year = dateSplit[2];

    const date = new Date(`${month}/${day}/${year}`);
    const monthStr = date.toLocaleString("es-ES", {
      month: "long",
    });
    console.log(monthStr);
    eventItems += `<div class="event_item cursor-pointer" id="evento" data-titulo="${element.titulo}" data-tipo="${element.tipo}" data-descripcion="${element.descripcion}" data-descripcion2="${element.descripcion2}">
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
                      <p class="text-primary">${element.titulo}</p>
                      <p>${element.descripcion2}</p>
                      <span class="line"></span>
                    </div>
`;
  });
  grid.innerHTML = eventItems;
}

function addOpenModalEvent() {
  const events = document.querySelectorAll("#evento");
  const modal = document.getElementById("event-modal");
  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });
  events.forEach((element) => {
    element.addEventListener("click", function () {
      const titulo = element.dataset.titulo;
      const tipo = element.dataset.tipo;
      const descripcion = element.dataset.descripcion;
      const descripcion2 = element.dataset.descripcion2;
      console.log(titulo, tipo, descripcion, descripcion2);
      modal.querySelector(".modal_titulo").innerText = titulo;
      modal.querySelector(".modal_tipo").innerText = tipo;
      modal.querySelector(".modal_descripcion").innerText = descripcion;
      modal.querySelector(".modal_descripcion2").innerText = descripcion2;
      modal.style.display = "flex";
    });
  });
}

generateWeekdays();
generateCalendar(currentDate);
generateEvents();
addOpenModalEvent();
