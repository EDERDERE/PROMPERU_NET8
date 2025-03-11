const TestSteps = () =>{
    return `
    <div class="bgwhite my-5 py-3">
  <div class="container">
    <div class="d-flex">
      <div class="steps-content mx-auto">
        <div class="progress_bar" id="progreso_bar"></div>
        <div class="pasos step_active" onclick="activateStep(0)">
          <div class="step-icon activado">
            <img src="../../shared/assets/inscripcion/diagnostic.svg" alt="diagnostic" />
          </div>
          <div class="step-text">Diagnóstico Empresarial</div>
        </div>
        <div class="pasos" onclick="activateStep(1)">
          <div class="step-icon">
            <img src="../../shared/assets/inscripcion/form.svg" alt="Solicitud de inscripción" />
          </div>
          <div class="step-text">Solicitud de inscripción</div>
        </div>
        <div class="pasos" onclick="activateStep(2)">
          <div class="step-icon">
            <img src="../../shared/assets/inscripcion/book.svg" alt="Matrícula a los cursos" />
          </div>
          <div class="step-text">Matrícula a los cursos</div>
        </div>
        <div class="pasos" onclick="activateStep(3)">
          <div class="step-icon">
            <img src="../../shared/assets/inscripcion/diploma.svg" alt="Test de salida" />
          </div>
          <div class="step-text">Test de salida</div>
        </div>
      </div>
    </div>
  </div>
</div>
    `
}

export default TestSteps;