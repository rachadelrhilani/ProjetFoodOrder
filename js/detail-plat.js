const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.querySelector("header");
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("fixed", "top-0", "left-0", "right-0", "shadow-md");
        header.classList.remove("-translate-y-full");
    } else {
        header.classList.remove("fixed", "top-0", "left-0", "right-0", "shadow-md");
        header.classList.remove("-translate-y-full");
    }
});