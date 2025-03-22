import { departmentProvinceMapping } from "../constants/departmentProvince.js";

export function setupCascadingSelects() {
  const regionSelect = document.querySelector('select[name="region"]');
  const provinceSelect = document.querySelector('select[name="provincia"]');

  if (!regionSelect || !provinceSelect) return;

  provinceSelect.disabled = true;

  regionSelect.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    provinceSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione una provincia";
    provinceSelect.appendChild(defaultOption);

    if (departmentProvinceMapping[selectedRegion]) {
      departmentProvinceMapping[selectedRegion].forEach((prov) => {
        const opt = document.createElement("option");
        opt.value = prov.value;
        opt.textContent = prov.text;
        provinceSelect.appendChild(opt);
      });
      provinceSelect.disabled = false;
    } else {
      provinceSelect.disabled = true;
    }
  });
}
