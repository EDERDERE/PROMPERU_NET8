// shared/js/utils/handleResponse.js

export function handleResponse(response, successMessage = "Operación realizada con éxito", callback) {
  if (response && response.success) {
    Swal.fire({
      title: "¡Éxito!",
      text: successMessage,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      if (callback && typeof callback === "function") {
        callback();
      }
    });
  } else {
    const errorMessage = response?.message || "Ocurrió un error inesperado";
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
}
