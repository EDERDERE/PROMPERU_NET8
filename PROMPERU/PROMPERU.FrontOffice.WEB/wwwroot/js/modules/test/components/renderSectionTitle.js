const renderSectionTitle = (title) => {
  return `
          <div class="container">
            <div class="my-5 py-5 d-flex justify-content-center align-items-center flex-column">
                <h2 class="section_title" id="section_title">
                    <span>${title}</span>
                    <div class="red-linear"></div>
                </h2>
            </div>
        </div>
    `;
};

export default renderSectionTitle;
