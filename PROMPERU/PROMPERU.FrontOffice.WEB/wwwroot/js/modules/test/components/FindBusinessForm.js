import { store } from "../state.js";
import { registerEvent } from "../utils/eventHandler.js";

const FindBusinessForm = () => {
  async function fetchCompanyData(ruc) {
    const formData = new FormData()
    formData.append('ruc', ruc)
    try {
      const response = await fetch("http://localhost:5095/Test/ConsultarRUC", {
        method: 'POST',
        body: formData
      });

      const responseJson = await response.json()

      console.log(responseJson)

      if(responseJson.success){
        store.setState({ test: responseJson.test });
        return responseJson.test.evaluado
      }

    } catch (error) {
      console.log(error)
    }
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
    const hasInstructions = store.getState().test.testDiagnostico.hasInstructions;
    if (hasInstructions) {
      store.setState({ currentStep: "intro" });
    } else {
      store.setState({ currentStep: 0 });
    }

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
};

export default FindBusinessForm;
