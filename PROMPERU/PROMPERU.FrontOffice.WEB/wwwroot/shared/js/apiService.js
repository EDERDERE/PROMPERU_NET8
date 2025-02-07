export async function fetchData(url) {
  try {
    const response = await $.ajax({ type: "GET", url, dataType: "json" });
    console.log(`Respuesta de ${url}:`, response);
    return response;
  } catch (error) {
    console.error(`Error al obtener datos de ${url}:`, error);
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: `Hubo un problema al obtener los datos. Inténtelo nuevamente más tarde.`,
    });
    return null;
  }
}
