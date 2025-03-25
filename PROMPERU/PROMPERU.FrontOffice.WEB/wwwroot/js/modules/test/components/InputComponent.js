export function InputComponent({ id, selectAnswers }) {
  const value =
    selectAnswers && selectAnswers.length ? selectAnswers[0].input : "";
  return `
    <div class="mt-5 mb-4 d-flex justify-content-center align-items-center flex-column">
      <input type="text" class="form-control num_ruc py-3 px-4" id="text-answer-${id}" placeholder="Escribe tu respuesta" data-event="handleInput" value="${value}">
    </div>
  `;
}
