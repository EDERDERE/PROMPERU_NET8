export function showAlertError(message, title = "Error") {
  Swal.fire({
    icon: "error",
    title,
    text: message,
  });
}
