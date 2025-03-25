export function QuestionLayout({ subTitle, questionText, content }) {
  return `
    <section>
      <div class="container">
        <div class="col-12 mx-auto">
          <h2 class="question-title mt-4 mb-4">${subTitle}</h2>
          <p class="text-muted">${questionText}</p>
          <div class="mt-5">
            ${content}
          </div>
        </div>
      </div>
    </section>
  `;
}
