import { store } from "../state.js";
import { registerEvent } from "../utils/eventHandler.js";
import { showAlertError } from "./Alert.js";
import { numericRegex } from "../utils/regex.js";
import { fetchCompanyData } from "../services/getTest.js";

const FindBusinessForm = () => {
  const state = store.getState();

  async function handleSubmit(event) {
    event.preventDefault();
    const ruc = document.getElementById("rucInput").value;

    if (!ruc || ruc.length !== 11 || !numericRegex.test(ruc)) {
      showAlertError(
        "Ingrese un RUC válido de 11 dígitos numéricos",
        "Validación"
      );
      return;
    }
    store.setState({ loading: true });

    console.log(store.getState());

    try {
      const companyData = await fetchCompanyData(ruc);

      if (!companyData) {
        return;
      }

      const hasInstructions = store.getState().test.activeTest.hasInstructions;
      if (hasInstructions) {
        store.setState({ currentStep: "intro" });
      } else {
        store.setState({ currentStep: 0 });
      }

      store.setState({ companyData });
      store.setState({ loading: false });
    } catch (error) {
      console.error(error);
    } finally {
      store.setState({ loading: false });
    }
  }

  registerEvent("submit", "companyFormSubmit", handleSubmit);

  return `
            <section id="search_business">
                <form id="companyForm" class="container" data-event="companyFormSubmit">
                <div class="mt-5 mb-4 d-flex justify-content-center align-items-center flex-column">
                    <input type="text" class="form-control num_ruc" id="rucInput" placeholder="Ingresa tu número de RUC" />
                    <div class="row buttons_group ">
                    <a href="/" class=" col-6 text-decoration-none">
                        <div class="button-test d-flex align-items-center">
                        <span> Ir al inicio </span>
                        <img src="../../shared/assets/contactanos/home.svg" alt="home" class="image-home" />
                        </div>
                    </a>
                    <span class="col-6 text-decoration-none ">
                        <button type="submit" class="button-test d-flex align-items-center border-0 ${
                          state.loading ? "loading" : ""
                        }">
                        <span class="loader"></span>
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
