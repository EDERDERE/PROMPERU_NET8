export function setupRedirectButton(buttonSelector, targetUrl) {
  const button = document.querySelector(buttonSelector);

  console.log(button);

  if (button) {
    button.addEventListener("click", function () {
      window.location.href = targetUrl;
    });
  }
}
