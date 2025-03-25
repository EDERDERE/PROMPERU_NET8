export function CoverLayout({ content }) {
  return `
      <section>
        <div class="container">
          <div class="text">
            ${content}
          </div>
        </div>
      </section>
    `;
}
