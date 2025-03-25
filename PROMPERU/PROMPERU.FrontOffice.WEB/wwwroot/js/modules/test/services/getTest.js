  import { fetchData } from "../../../../shared/js/apiService.js";
  import { store } from "../state.js";

    export async function fetchCompanyData(ruc) {
      const formData = new FormData();
      formData.append("ruc", ruc);
      try {
        const response = await fetchData(
          "/Test/ConsultarRUC",
          "POST",
          formData,
          true
        );

        if (response.success) {
          store.setState({ test: response.test });
          return response.test.evaluated;
        }
      } catch (error) {
        console.error(error);
      }
    }
