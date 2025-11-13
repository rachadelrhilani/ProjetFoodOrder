let burger = document.getElementById("burger");
let navright = document.querySelector(".nav-right");
let nav = document.querySelector("nav");

burger.addEventListener("click", function () {
    navright.classList.toggle("active");
});

//////////////////////// nav bar (responsive) ///////////////////

addEventListener("scroll", function () {
    if (window.scrollY > 10) {
        nav.classList.add("scrol");
    } else {
        nav.classList.remove("scrol");
    }
});

////////// fetch data from json file & carousel ///////

fetch("/data/menu.json")
    .then(response => response.json())
    .then(data => {

        let menuContainer = document.getElementById("menu-carousel-container");

        let categories = ["Breakfast", "Lunch", "Dinner"];

        categories.forEach(cat => {
            let section = document.createElement("div");
            section.classList.add("carousel-section");

            section.innerHTML = `
            <h2 class="carousel-title">${cat}</h2>
            <div class="carousel" id="carousel-${cat.toLowerCase()}"></div>
            <div class="carousel-controls">
                <button class="prev" data-cat="${cat.toLowerCase()}">&#10094;</button>
                <button class="next" data-cat="${cat.toLowerCase()}">&#10095;</button>
            </div>
            `;
            menuContainer.appendChild(section);

            let filtered = data.filter(item => item.mealType.toLowerCase() === cat.toLowerCase());

            let carousel = section.querySelector(".carousel");

            filtered.forEach(item => {
                let card = document.createElement("div");
                card.classList.add("menu-card");

                card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price}</p>
                </div>
                `;
                carousel.appendChild(card);
            });
        });

        let slides = document.querySelectorAll(".carousel");
        slides.forEach(slide => {
            let nextBtn = slide.parentElement.querySelector(".next");
            let prevBtn = slide.parentElement.querySelector(".prev");

            nextBtn.addEventListener("click", () => {
                slide.scrollBy({ left: 300, behavior: "smooth" });
            });

            prevBtn.addEventListener("click", () => {
                slide.scrollBy({ left: -300, behavior: "smooth" });
            });
        });
    })
    .catch(err => console.error("errur de fetch data from json:", err));

/////////// pagination using javascript //////////////////

etch("/data/testimonials.json")
    .then(res => res.json())
    .then(data => {
        renderTestimonials(data);
    });

function renderTestimonials(data) {
    const container = document.getElementById("testimonial-container");
    const pagination = document.getElementById("testimonial-pagination");

    data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("testimonial-card");
        if (index === 0) card.classList.add("active");
        card.innerHTML = `
        <i class="fas fa-quote-left"></i>
        <p>${item.message}</p>
        <div class="client">
            <img src="${item.image}" alt="${item.name}">
            <div>
            <h3>${item.name}</h3>
            <p>${item.title}</p>
            </div>
        </div>
        `;
        container.appendChild(card);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.dataset.index = index;
        pagination.appendChild(dot);
    });

    initPagination();
}

function initPagination() {
    const cards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = dot.dataset.index;

            cards.forEach(c => c.classList.remove("active"));
            dots.forEach(d => d.classList.remove("active"));


            cards[index].classList.add("active");
            dots[index].classList.add("active");
        });
    });
}


