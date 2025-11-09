const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("fixed", "top-0", "left-0", "right-0", "shadow-md", "translate-y-0");
        header.classList.add("transform","-translate-y-full","transition-transform","duration-300","ease-in-out");
        mobileMenu.classList.add("fixed", "top-[60px]", "left-0", "right-0", "w-full");
    } else {
        header.classList.remove("fixed", "top-0", "left-0", "right-0", "shadow-md", "translate-y-0");
        header.classList.remove("transform","-translate-y-full","transition-transform","duration-300","ease-in-out");
    }
});