export async function fetchData(
  url,
  method = "GET",
  data = null,
  useFormData = false
) {
  try {
    const options = { type: method, url };
    if (data) {
      options.data = data;
      if (useFormData) {
        options.dataType = "json";
        options.processData = false;
        options.contentType = false;
      }
    }

    const response = await $.ajax(options);

    if (!response.success) {
      throw { status: 400, responseJSON: response };
    }

    return response;
  } catch (error) {
    console.error(`❌ Error en la solicitud a ${url}:`, error);
    console.error("Response Text:", error.responseText);

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
      (error.responseJSON && error.responseJSON.message) ||
      "Hubo un problema al obtener los datos. Inténtelo más tarde.";

    let dynamicTitle = "Error en la solicitud";
    let dynamicIcon = "error";

    if (
      error.status === 400 &&
      error.responseJSON &&
      error.responseJSON.validations
    ) {
      const { validations } = error.responseJSON;
      const messages = [];

      if (validations.SUNAT === false) {
        messages.push("No se encuentra registrada en el directorio");
        messages.push(
          "No tiene más de un año de operación en  servicios turísticos a nivel nacional"
        );

        messages.push("Tiene sanciones en INDECOPI");
        messages.push("Tiene adeudos en PROMPERÚ");
      }

      if (validations.INDECOPI === false) {
        messages.push(
          "El RUC no pasó las validaciones requeridas para INDECOPI."
        );
      }

      if (messages.length > 0) {
        errorMessage = `  <ol class="text-start pb-3">
        ${messages.map((msg) => `<li class="mb-2">${msg}</li>`).join("")}
        </ol>`;

        const sunatError = validations.SUNAT === false;
        const indecopiError = validations.INDECOPI === false;

        if (sunatError && indecopiError) {
          dynamicTitle = "Errores en SUNAT e INDECOPI";
          dynamicIcon = "info";
        } else if (sunatError) {
          dynamicTitle = "No cumple con los siguientes requisitos";
          dynamicIcon = "info";
        } else if (indecopiError) {
          dynamicTitle = "Error en INDECOPI";
          dynamicIcon = "info";
        }
      }
    }

    Swal.fire({
      icon: dynamicIcon,
      title: dynamicTitle,
      html: errorMessage,
    });

    return null;
  }
}

export async function fetchJsonData(url, method = "GET", data = null) {
  try {
    const options = {
      type: method,
      url,
      contentType: "application/json",
      dataType: "json",
    };

    if (data) {
      options.data = JSON.stringify(data);
    }

    const response = await $.ajax(options);

    if (!response.success) {
      throw new Error(response.message || "Error en la respuesta del servidor");
    }

    return response;
  } catch (error) {
    console.error(`❌ Error en la solicitud a ${url}:`, error);

    Swal.fire({
      icon: "error",
      title: "Error en la solicitud",
      text: "Hubo un problema al obtener los datos. Inténtelo más tarde.",
    });

    return null;
  }
}
