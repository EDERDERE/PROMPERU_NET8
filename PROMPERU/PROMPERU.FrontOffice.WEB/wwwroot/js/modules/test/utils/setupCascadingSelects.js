import { store } from "../state.js";
import { departmentProvinceMapping } from "../constants/departmentProvince.js";

export function setupCascadingSelects() {
  const regionSelect = document.querySelector('select[name="region"]');
  const provinceSelect = document.querySelector('select[name="province"]');

  if (!regionSelect || !provinceSelect) return;

  provinceSelect.disabled = true;

  provinceSelect.addEventListener("change", () => {
    const selectedOption = provinceSelect.options[provinceSelect.selectedIndex];
    if (selectedOption) {
      const companyData = store.getState().companyData || {};
      store.setState({
        companyData: {
          ...companyData,
          province: selectedOption.textContent,
        },
      });
    }
  });

  const populateProvinces = (selectedRegion) => {
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

      const companyData = store.getState().companyData || {};
      let storedProvince = companyData.province || "";
      if (storedProvince) {
        let found = false;

        for (let i = 0; i < provinceSelect.options.length; i++) {
          const opt = provinceSelect.options[i];
          if (opt.textContent === storedProvince) {
            provinceSelect.selectedIndex = i;
            found = true;
            break;
          }
          if (opt.value === storedProvince) {
            provinceSelect.selectedIndex = i;
            store.setState({
              companyData: {
                ...companyData,
                province: opt.textContent,
              },
            });
            found = true;
            break;
          }
        }
        if (!found) {
          provinceSelect.selectedIndex = 0;
        }
      } else {
        provinceSelect.selectedIndex = 0;
      }
    } else {
      provinceSelect.disabled = true;
    }
  };

  regionSelect.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    populateProvinces(selectedRegion);
    const companyData = store.getState().companyData || {};
    store.setState({
      companyData: {
        ...companyData,
        province: "",
      },
    });
  });

  if (regionSelect.value) {
    populateProvinces(regionSelect.value);
  }
}
