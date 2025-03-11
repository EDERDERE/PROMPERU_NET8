const NavigationButtons = (showBack=true, showNext=true, backText='Anterior', nextText='Siguiente', backIcon=null, nextIcon=null) => {
    return `
        <div class="d-flex justify-content-end">
            <div class="row buttons_group">
            ${
                showBack ? `
                 <a href="/" class="col-6 text-decoration-none">
                    <div class="button-outline d-flex align-items-center h-100">
                    <span>${backText}</span>
                    </div>
                </a>
                ` : ''
            }
            ${
                showNext ? `
                 <a href="/" class="col-6 text-decoration-none">
                    <div class="button-test d-flex align-items-center">
                    <span>${nextText}</span>
                    </div>
                </a>
                ` : ''
            }
            </div>
        </div>
    `
}

export default NavigationButtons;