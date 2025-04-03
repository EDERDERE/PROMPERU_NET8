export function startInactivityMonitor() {
  let inactivityTimeout;

  function resetInactivityTimer() {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
    inactivityTimeout = setTimeout(checkInactivity, 60000);
  }

  function checkInactivity() {
    Swal.fire({
      title: "Inactividad detectada",
      text: "No has interactuado en la página durante 1 minuto. ¿Deseas continuar navegando?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c3122c",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cerrar",
      cancelButtonColor: "#403C3C",
      timer: 30000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        window.close();
      } else if (result.isConfirmed) {
        resetInactivityTimer();
      } else {
        window.close();
      }
    });
  }

  document.addEventListener("mousemove", resetInactivityTimer);
  document.addEventListener("keydown", resetInactivityTimer);
  document.addEventListener("click", resetInactivityTimer);
  document.addEventListener("touchstart", resetInactivityTimer);

  resetInactivityTimer();
}
