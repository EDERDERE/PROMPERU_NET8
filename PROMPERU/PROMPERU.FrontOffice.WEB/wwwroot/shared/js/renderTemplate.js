export function renderTemplate(containerId, template, data = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(
      `❌ Error: No se encontró el contenedor con ID "${containerId}"`
    );
    return;
  }

  container.innerHTML =
    typeof template === "function" ? template(data) : template;
}
