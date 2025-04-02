import { store } from "../state.js";
const Results = () => {
  const state = store.getState();

  const charts = () => {
    return state.test?.resumen?.approvedCourses.map((course) => {
      return `
        <div class="d-flex align-items-center justify-content-center">
          <div class="item css">
            <div class="content">
              <h3>${course.individualScore} de ${course.globalScore}</h3>
              <span>${course.courseName}</span>
            </div>
            <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
              <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
                style="--percent: ${course.individualScore / course.globalScore * 100};" />
          </svg>
        </div>
      </div>
    `;
  }).join("");
  };

  const failedCharts = () => {
    return state.test?.resumen?.disapprovedCourses.map((course) => {
      return `
        <div class="card-custom">
          <div class="d-flex align-items-center">
            <div class="circle"></div>
            <span>${course.courseName}</span>
          </div>
        </div>
      `;
    }).join("");
  };

  return `
    <div class="container">
        <div class="my-5 py-5 d-flex justify-content-center align-items-center flex-column">
            <h2 class="section_title" id="section_title">
                <span>Resumen de Diagnóstico</span>
                <div class="red-linear"></div>
            </h2>
        </div>
    </div>
    <div class="container-sm">
     <div class="row">
        <div class="col-6">
        <div class="col-8 mx-auto mb-4">
                  <div class="card-custom">
                    <div class="icon-circle approved">
                      <img
                        src="../../shared/assets/inscripcion/certificate_approved.svg"
                        alt=""
                      />
                    </div>
                    <h5 class="mt-3 fw-bold">Cursos Aprobados</h5>
                    <p class="text-muted">${state.test?.resumen?.approvedCoursesCount} / ${state.test?.resumen?.coursesCount}</p>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-approved"
                        style="width: ${state.test?.resumen?.approvedCoursesCount / state.test?.resumen?.coursesCount * 100}%"
                      ></div>
                    </div>
                  </div>
                </div>
        </div>
        <div class="col-6">
         <div class="col-8 mx-auto mb-4">
                  <div class="card-custom">
                    <div class="icon-circle failed">
                      <img
                        src="../../shared/assets/inscripcion/certificate_disapproved.svg"
                        alt=""
                      />
                    </div>
                    <h5 class="mt-3 fw-bold">Cursos Desaprobados</h5>
                    <p class="text-muted">${state.test?.resumen?.failedCoursesCount} / ${state.test?.resumen?.coursesCount}</p>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-failed"
                        style="width: ${state.test?.resumen?.failedCoursesCount / state.test?.resumen?.coursesCount * 100}%"
                      ></div>
                    </div>
                  </div>
                </div>
        </div>
    </div>

    ${
      state.test?.resumen?.approvedCourses.length > 0 &&
    `<div class="container">
        <div class="my-5 py-5 d-flex justify-content-center align-items-center flex-column">
            <h2 class="section_title" id="section_title">
                <span>Felicidades</span>
                <div class="red-linear"></div>
            </h2>
            <p class="fs-3">Tienes grandes habilidades en estos cursos</p>
        </div>
    </div>

  <div class="container">
    <div class="chart_grid gap-4">
      ${charts()}
    </div>
  </div>
  `
}
  ${
    state.test?.resumen?.disapprovedCourses.length > 0 &&
    `
    <div class="container">
      <div class="my-5 py-5 d-flex justify-content-center align-items-center flex-column">
        <h2 class="section_title" id="section_title">
          <span>Resumen de Diagnóstico</span>
          <div class="red-linear"></div>
        </h2>
      </div>
    </div>
    <div class="container mb-5">
      <div class="chart_grid gap-4">
        ${failedCharts()}
      </div>
    </div>
    `
  }
    `;
};

export default Results;
