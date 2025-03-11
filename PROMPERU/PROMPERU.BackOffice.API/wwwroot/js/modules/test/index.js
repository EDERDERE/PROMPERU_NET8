import { setupRedirectButton } from "../utils/helpers.js";
import { initDataTable } from "./dataTable.js";

document.addEventListener("DOMContentLoaded", function () {
  initDataTable("tableListTest", "/Test/ListarTest");
  setupRedirectButton("#createTest", "/Test/Crear");
});
