let burger = document.getElementById("burger");
let navright = document.querySelector(".nav-right");
let nav = document.querySelector("nav");

burger.addEventListener("click", function () {
    navright.classList.toggle("active");
});

//////////////////////// nav bar (responsive) ///////////////////

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        nav.classList.add("scrol");
    } else {
        nav.classList.remove("scrol");
    }
});