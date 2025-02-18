export function renderRegions(regions) {


  const select = document.querySelector("#inputRegion");

  if (!select) {
    console.warn("El elemento #inputRegion no se encontró.");
    return;
  }

  select.innerHTML = "<option selected>Seleccione su región</option>";

  if (regions.length > 0) {
    regions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region.regi_ID;
      option.textContent = region.regi_Nombre;
      select.appendChild(option);
    });
  } else {
    select.innerHTML += "<option disabled>No hay regiones disponibles</option>";
  }
}
