import { store } from "../state.js";
const Results = () => {
  const state = store.getState();
  const companyName = state.companyData?.legalName;

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
    <!-- Header with logo and title -->
    <div class="container mt-5">
      <div class="row mb-5">
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center">
            <div class="mb-4">
              <img src="../../shared/assets/inscripcion/check_business.png" alt="Logo" width="80" height="80" class="img-fluid">
            </div>
            <div>
              <h4 class="text-secondary mb-1">Nombre comercial:</h4>
              <h2 class="text-success fw-bold">${companyName}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Thank you message -->
      <div class="row mb-3">
        <div class="col-12 text-center">
          <h2 class="question-title fw-bold">¡Gracias por participar en el Test de diagnóstico empresarial!</h2>
        </div>
      </div>

      <!-- Description text -->
      <div class="row mb-5">
        <div class="col-12">
          <p class="fs-4 lh-base text">
            A continuación, te presentamos un resumen de tus resultados, con las áreas que necesitas reforzar y las
            competencias en las que ya destacas. Recuerda que los cursos recomendados están diseñados para
            ayudarte a mejorar.
          </p>
        </div>
      </div>

      <!-- Results Summary Section -->
      <div class="row mb-5 mt-5">
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center flex-column">
            <h2 class="section_title">
              <span>Resumen de Diagnóstico</span>
              <div class="red-linear"></div>
            </h2>
          </div>
        </div>
      </div>

      <!-- Approved and Failed Courses -->
      <div class="row mb-5">
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="">
            <div class="card-custom">
              <div class="icon-circle approved">
                <img src="../../shared/assets/inscripcion/certificate_approved.svg" alt="Aprobado">
              </div>
              <h5 class="mt-3 fw-bold">Cursos Aprobados</h5>
              <p class="text-muted">${state.test?.resumen?.approvedCoursesCount} / ${state.test?.resumen?.coursesCount}</p>
              <div class="progress">
                <div class="progress-bar progress-bar-approved" 
                  style="width: ${state.test?.resumen?.approvedCoursesCount / state.test?.resumen?.coursesCount * 100}%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="">
            <div class="card-custom">
              <div class="icon-circle failed">
                <img src="../../shared/assets/inscripcion/certificate_disapproved.svg" alt="Desaprobado">
              </div>
              <h5 class="mt-3 fw-bold">Cursos Desaprobados</h5>
              <p class="text-muted">${state.test?.resumen?.failedCoursesCount} / ${state.test?.resumen?.coursesCount}</p>
              <div class="progress">
                <div class="progress-bar progress-bar-failed" 
                  style="width: ${state.test?.resumen?.failedCoursesCount / state.test?.resumen?.coursesCount * 100}%">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${state.test?.resumen?.approvedCourses.length > 0 ? `
      <!-- Congratulations Section -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="my-5 d-flex justify-content-center align-items-center flex-column">
            <h2 class="section_title">
              <span>Felicidades</span>
              <div class="red-linear"></div>
            </h2>
            <p class="fs-3 text-center">Tienes grandes habilidades en estos cursos</p>
          </div>
        </div>
      </div>

      <!-- Approved Courses Charts -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="chart_grid gap-4">
            ${charts()}
          </div>
        </div>
      </div>
      ` : ''}

      ${state.test?.resumen?.disapprovedCourses.length > 0 ? `
      <!-- Areas to Improve Section -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="my-5 d-flex justify-content-center align-items-center flex-column">
            <h2 class="section_title">
              <span>Áreas por Mejorar</span>
              <div class="red-linear"></div>
            </h2>
          </div>
        </div>
      </div>

      <!-- Failed Courses List -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="chart_grid gap-4">
            ${failedCharts()}
          </div>
        </div>
      </div>
      ` : ''}
    </div>
  `;
};

export default Results;
