const Results = `
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
                    <p class="text-muted">5 / 9</p>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-approved"
                        style="width: 55%"
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
                    <p class="text-muted">4 / 9</p>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-failed"
                        style="width: 45%"
                      ></div>
                    </div>
                  </div>
                </div>
        </div>
    </div>

    <div class="container">
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
      <!-- Gráficos -->
      <div class="d-flex align-items-center justify-content-center">
        <div class="item css">
          <div class="content">
            <h3>4.5 de 5</h3>
            <span>Innovación</span>
          </div>
          <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
              style="--percent: 25;" />
          </svg>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center">
        <div class="item css">
          <div class="content">
            <h3>4.5 de 5</h3>
            <span>Creatividad</span>
          </div>
          <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
              style="--percent: 12;" />
          </svg>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center">
        <div class="item css">
          <div class="content">
            <h3>4.5 de 5</h3>
            <span>Creatividad</span>
          </div>
          <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
              style="--percent: 12;" />
          </svg>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center">
        <div class="item css">
          <div class="content">
            <h3>4.5 de 5</h3>
            <span>Creatividad</span>
          </div>
          <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
              style="--percent: 12;" />
          </svg>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center">
        <div class="item css">
          <div class="content">
            <h3>4.5 de 5</h3>
            <span>Resolución de Problemas</span>
          </div>
          <svg class="chart-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle_animation" r="96" cy="100" cx="100" stroke-width="8" stroke="#69aff4" fill="none"
              style="--percent: 45;" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="my-5 py-5 d-flex justify-content-center align-items-center flex-column">
      <h2 class="section_title">
        <span>Resumen de Diagnóstico</span>
        <div class="red-linear"></div>
      </h2>
    </div>
  </div>

  <div class="container mb-5">
    <div class="chart_grid gap-4">
      <div class="card-custom">
        <div class="d-flex align-items-center">
          <div class="circle"></div>
          <span>Distrubución</span>
        </div>
      </div>
      <div class="card-custom">
        <div class="d-flex align-items-center">
          <div class="circle"></div>
          <span>Distrubución</span>
        </div>
      </div>
      <div class="card-custom">
        <div class="d-flex align-items-center">
          <div class="circle"></div>
          <span>Distrubución</span>
        </div>
      </div>
      <div class="card-custom">
        <div class="d-flex align-items-center">
          <div class="circle"></div>
          <span>Distrubución</span>
        </div>
      </div>
      <div class="card-custom">
        <div class="d-flex align-items-center">
          <div class="circle"></div>
          <span>Distrubución</span>
        </div>
      </div>
    </div>
  </div>
    `;

export default Results;
