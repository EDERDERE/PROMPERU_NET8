export async function fetchData(url, method = "GET", data = null) {
  try {
    const options = {
      type: method,
      url      
    };

      if (data) {
          options.data = data; 
      }

      console.log(options)
    const response = await $.ajax(options);

    if (!response.success) {
      throw new Error(response.message || "Error en la respuesta del servidor");
    }

    return response;
  } catch (error) {
    console.error(`❌ Error en la solicitud a ${url}:`, error);

    const errorMessages = {
      400: "Solicitud incorrecta. Verifique los datos enviados.",
      401: "No autorizado. Verifique sus credenciales.",
      403: "No tiene permisos para realizar esta acción.",
      404: "El recurso solicitado no fue encontrado.",
      408: "Tiempo de espera agotado. Intente nuevamente.",
      500: "Error interno del servidor. Intente nuevamente.",
      502: "Error de comunicación con el servidor.",
      503: "Servicio no disponible en este momento.",
      504: "El servidor tardó demasiado en responder.",
    };

    let errorMessage =
      errorMessages[error.status] ||
      error.responseJSON?.message ||
      "Hubo un problema al obtener los datos. Inténtelo más tarde.";

    Swal.fire({
      icon: "error",
      title: "Error en la solicitud",
      text: errorMessage,
    });

    return null;
  }
}
