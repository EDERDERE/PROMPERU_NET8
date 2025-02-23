import { fetchData } from "../../../shared/js/apiService.js";
import { renderBannerEmpresa, renderSliderEmpresa } from "./render.js";

let empresasData = [];

export async function loadListEmpresas() {
  try {
    const data = await fetchData("/Empresa/ListarEmpresas");
    if (data?.empresas?.length > 0) {
      empresasData = data.empresas;
      renderBannerEmpresa(empresasData[0]);
      applyFilters();
      setupFilters();
    } else {
      $("#sliderEmpresaHome").html("<p>No hay empresas disponibles.</p>");
    }
  } catch (error) {
    console.error("Error cargando empresas:", error);
  }
}

function setupFilters() {
  $("#inputRegion, #inputTipoEmpresa")
    .off("change")
    .on("change", function () {
      applyFilters();
    });

  $("#inputRUC")
    .off("input")
    .on("input", function () {
      let value = $(this).val();

      value = value.replace(/\D/g, "").slice(0, 11);
      $(this).val(value);

      if (value.length === 11) {
        applyFilters();
      }
    });

  $("#btnClearFilters")
    .off("click")
    .on("click", function () {
      $("#inputRegion").prop("selectedIndex", 0).trigger("change");
      $("#inputTipoEmpresa").prop("selectedIndex", 0).trigger("change");
      $("#inputRUC").val("").trigger("input");

      applyFilters();
    });
}

function applyFilters() {
  const selectedRegionLabel = $("#inputRegion option:selected").text();
  const selectedTypeLabel = $("#inputTipoEmpresa option:selected").text();
  const inputRUC = $("#inputRUC").val();

  const filteredEmpresas = empresasData.filter((empresa) => {
    let matchRegion = true;
    let matchType = true;
    let matchRUC = true;

    if (selectedRegionLabel && selectedRegionLabel !== "Seleccione su región") {
      matchRegion = empresa.region === selectedRegionLabel;
    }
    if (selectedTypeLabel && selectedTypeLabel !== "Seleccione su tipo") {
      matchType = empresa.tipoEmpresa === selectedTypeLabel;
    }
    if (inputRUC.length === 11) {
      matchRUC = empresa.egra_RUC === inputRUC;
    }

    return matchRegion && matchType && matchRUC;
  });

  if (filteredEmpresas.length > 0) {
    renderSliderEmpresa(filteredEmpresas);
  } else {
    $("#sliderEmpresa").html(
      "<h5 class='empresa-empty'>No hay empresas disponibles para esos filtros.</h5>"
    );
  }
}
