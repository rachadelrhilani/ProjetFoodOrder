let burger = document.getElementById("burger");
let navright = document.querySelector(".nav-right");

burger.addEventListener("click", function () {
    navright.classList.toggle("active");
});

// fin le burger menu 