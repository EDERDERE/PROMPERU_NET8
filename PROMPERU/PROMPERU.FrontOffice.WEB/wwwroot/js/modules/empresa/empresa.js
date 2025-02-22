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
    .on("change", () => {
      applyFilters();
    });
}

function applyFilters() {
  const selectedRegionLabel = $("#inputRegion option:selected").text();
  const selectedTypeLabel = $("#inputTipoEmpresa option:selected").text();

  const filteredEmpresas = empresasData.filter((empresa) => {
    let matchRegion = true;
    let matchType = true;
    if (selectedRegionLabel && selectedRegionLabel !== "Seleccione su región") {
      matchRegion = empresa.region === selectedRegionLabel;
    }
    if (selectedTypeLabel && selectedTypeLabel !== "Seleccione su tipo") {
      matchType = empresa.tipoEmpresa === selectedTypeLabel;
    }
    return matchRegion && matchType;
  });
  if (filteredEmpresas.length > 0) {
    renderSliderEmpresa(filteredEmpresas);
  } else {
    $("#sliderEmpresa").html(
      "<h5 class='empresa-empty'>No hay empresas disponibles para esos filtros.</h5>"
    );
  }
}
