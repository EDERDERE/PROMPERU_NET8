const Instrucciones = (data) => {
  return `
    <section>
        <div class="container">
            <div class="text">
                ${data.description}
            </div>
            <br/>
            ${
              data.alert
                ? `
                <div class="alert">
                    <img src="${data.alertIcon}" />
                    <span>
                        ${data.alert}
                    </span>
                </div>
                `
                : ""
            }
        </div>
    </section>
    `;
};

export default Instrucciones;
