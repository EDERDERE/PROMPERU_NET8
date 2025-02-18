export function renderTypesCompany(types) {

  const select = document.querySelector("#inputTipoEmpresa");

  if (!select) {
    console.warn("El elemento #inputTipoEmpresa no se encontró.");
    return;
  }

  select.innerHTML = "<option selected>Seleccione su tipo</option>";

  if (types.length > 0) {
    types.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.temp_ID;
      option.textContent = type.temp_Nombre;
      select.appendChild(option);
    });
  } else {
    select.innerHTML += "<option disabled>No hay tipos de empresa disponibles</option>";
  }
}
