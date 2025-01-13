const menu = document.querySelectorAll('.menu');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

menu.forEach((menuBtn) => {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });
})