import { store } from "../state.js"; // Importamos el estado global
import { registerEvent } from "../utils/eventHandler.js";

const FindBusinessForm = () => {

    async function fetchCompanyData(ruc) {
        // Simulación de llamada a API con un retraso de 1.5s
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ruc,
                    name: "Empresa Ejemplo SAC",
                    address: "Av. Falsa 123, Lima",
                });
            }, 1500);
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const ruc = document.getElementById("rucInput").value;

        if (!ruc) {
            alert("Ingrese un RUC válido");
            return;
        }

        // Simula la llamada al endpoint
        const companyData = await fetchCompanyData(ruc);

        // Guarda los datos en el estado global
        store.setState({ companyData });
    }

    registerEvent("submit", "companyFormSubmit", handleSubmit);

    return `
            <section id="search_business">
                <form id="companyForm" class="container" data-event="companyFormSubmit">

                <div class="mt-5 mb-4 d-flex justify-content-center align-items-center flex-column">
                    <input type="text" class="form-control num_ruc" id="rucInput" placeholder="Ingresa tu número de RUC" />
                    <div class="row buttons_group">
                    <a href="/" class="col-6 text-decoration-none">
                        <div class="button-test d-flex align-items-center">
                        <span> Ir al inicio </span>
                        <img src="../../shared/assets/contactanos/home.svg" alt="home" class="image-home" />
                        </div>
                    </a>
                    <span class="col-6 text-decoration-none">
                        <button type="submit" class="button-test d-flex align-items-center border-0">
                        <span>Buscar</span>
                        <img src="../../shared/assets/inscripcion/search.svg" alt="home" class="image-home" />
                        </button>
                    </span>
                    </div>
                </div>
                </form>
            </section>
        `;
}

export default FindBusinessForm;