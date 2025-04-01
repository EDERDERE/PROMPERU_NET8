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

    try {
      const test = await fetchCompanyData(ruc);
      if (!test) {
        return;
      }

      const hasInstructions = test.activeTest.hasInstructions;
      let step = 0;
      if (hasInstructions) {
        step = "intro";
      } else {
        step = 0;
      }

      const lastElementCompleted = test.activeTest.elements.filter(
        (element) => element.isComplete
      ).map((element, index) => index);
      const lastCompletedIndex = lastElementCompleted.length > 0 ? lastElementCompleted[lastElementCompleted.length - 1] : 0;
      // all the elements before the last completed element are completed
      const completedElements = test.activeTest.elements.slice(0, lastCompletedIndex + 1);
      completedElements.forEach(element => element.isComplete = true);
      // the next element after the last completed element is the current step
      step = lastCompletedIndex + 1;

      store.setState({ companyData: test.companyData, test, currentStep: step, loading: false });
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
