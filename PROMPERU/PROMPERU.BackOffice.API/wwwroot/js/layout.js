$(document).ready(function () {
  loadMenu();
  setActiveMenuItem();
});

function loadMenu() {
  const menu = document.querySelectorAll(".menu");
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  menu.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
}

function setActiveMenuItem() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".sidebar .menu-item a");

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (currentPath === linkPath) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
}
