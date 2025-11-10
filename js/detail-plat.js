const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("fixed", "top-0", "left-0", "right-0", "shadow-md", "translate-y-0");
        header.classList.add("transform", "-translate-y-full", "transition-transform", "duration-300", "ease-in-out");
        mobileMenu.classList.add("fixed", "top-[60px]", "left-0", "right-0", "w-full");
    } else {
        header.classList.remove("fixed", "top-0", "left-0", "right-0", "shadow-md", "translate-y-0");
        header.classList.remove("transform", "-translate-y-full", "transition-transform", "duration-300", "ease-in-out");
    }
});

fetch("../data/menu.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier JSON");
        }
        return response.json();
    })
    .then(data => {
        // Exemple : récupérer le plat avec l'id 1
        const plat = data.find(item => item.id === 1);
        console.log(plat);
        const container = document.getElementById("plat-content");
        if (!plat) {
            container.innerHTML = "<p class='text-center text-red-500'>Plat introuvable.</p>";
            return;
        }
        // Créer le HTML dynamiquement
        container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold mb-6 text-center">${plat.name}</h3>
        <img src="${plat.image}" alt="${plat.name}" 
  class=" shadow-md mx-auto mb-6 w-full max-w-2xl h-[450px] object-cover detail" />
      </div>

      <p class="text-gray-700 text-left leading-relaxed mb-6">
        ${plat.description}
      </p>

      <div>
        <div>
          <strong class="text-left">Ingrédients :</strong>
          <ul class="text-left text-yellow-500 mb-6">
            ${plat.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="flex justify-center">
        <button class="bg-yellow-500 flex justify-center hover:bg-yellow-400 text-white ml-6 px-4 py-2 font-semibold space-x-2">
          <span>Ajouter au Panier</span>
          <img src="../images/Shopping cart.png" alt="Shopping cart" class="w-5 h-5" />
        </button>
      </div>
    `;
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
