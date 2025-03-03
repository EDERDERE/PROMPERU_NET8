import { setupRedirectButton } from "../utils/helpers.js";
import { initDataTable } from "./dataTable.js";

document.addEventListener("DOMContentLoaded", function () {
  initDataTable("miTabla", "/api/listar");
  setupRedirectButton("#createTest", "/Test/Crear");
});
