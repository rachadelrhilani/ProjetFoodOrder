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
/* pop up panier */


//  const btnPanier = document.getElementById('btn-panier');
//   const popupPanier = document.getElementById('popup-panier');
//   const closePanier = document.getElementById('close-panier');


//   btnPanier.addEventListener('click', () => {
//     popupPanier.classList.remove('hidden');
//   });


//   closePanier.addEventListener('click', () => {
//     popupPanier.classList.add('hidden');
//   });


//   popupPanier.addEventListener('click', (e) => {
//     if (e.target === popupPanier) {
//       popupPanier.classList.add('hidden');
//     }
//   });

/* pop up paiement */

// const commanderBtn = document.getElementById('commander');
// const popupPaiement = document.getElementById('popup-paiement');
// const closePaiement = document.getElementById('close-paiement');


// commanderBtn.addEventListener('click', () => {
//   popupPanier.classList.add('hidden');
//   popupPaiement.classList.remove('hidden');
// });


// closePaiement.addEventListener('click', () => {
//   popupPaiement.classList.add('hidden');
// });


// popupPaiement.addEventListener('click', (e) => {
//   if (e.target === popupPaiement) {
//     popupPaiement.classList.add('hidden');
//   }
// });
const params = new URLSearchParams(window.location.search);
const platId = parseInt(params.get("id"));
fetch("../Menu.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur de chargement du fichier JSON");
    }
    return response.json();
  })
  .then(data => {
    const plat = data.find(item => item.id === platId);
    const container = document.getElementById("plat-content");
    if (!plat) {
      container.innerHTML = "<p class='text-center text-red-500'>Plat introuvable.</p>";
      return;
    }

    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold mb-6 text-center">${plat.name}</h3>
        <img src="${plat.image}" alt="${plat.name}" 
          class="shadow-md mx-auto mb-6 w-[600px] max-w-2xl h-[590px] object-cover detail" />
      </div>

      <p class="text-gray-700 text-left leading-relaxed mb-6">${plat.description}</p>

      <div>
        <strong class="text-left block mb-2">Ingrédients :</strong>
        <ul class="text-left text-yellow-500 mb-6">
          ${Array.isArray(plat.ingredients)
            ? plat.ingredients.map(ing => `<li>${ing}</li>`).join('')
            : '<li>Aucun ingrédient disponible</li>'}
        </ul>

        <div class="flex justify-between items-start gap-6">
          <div class="flex flex-col gap-2">
            <label>Quantité :</label>
            <input id="qty" type="number" min="1" value="1"
              class="w-24 p-1 border border-gray-300 rounded text-black" />

            <label>Taille :</label>
            <select id="size" class="p-1 border border-gray-300 rounded text-black">
              ${plat.size.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>

            <span id="total" class="bg-orange-500 text-white px-3 py-1 rounded text-center">
              Total : ${plat.price.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button id="addToCart"
          class="bg-yellow-500 flex justify-center hover:bg-yellow-400 text-white px-4 py-2 font-semibold space-x-2">
          <span>Ajouter au Panier</span>
          <img src="../images/Shopping cart.png" alt="Shopping cart" class="w-5 h-5" />
        </button>
      </div>
    `;

    
    const qtyInput = document.getElementById("qty");
    const totalSpan = document.getElementById("total");

    qtyInput.addEventListener("input", () => {
      const total = (plat.price * qtyInput.value).toFixed(2);
      totalSpan.textContent = `Total : ${total} €`;
    });

    
    const addToCartBtn = document.getElementById("addToCart");
    addToCartBtn.addEventListener("click", () => {
      const selectedSize = document.getElementById("size").value;
      const quantity = parseInt(qtyInput.value);

      const newItem = {
        id: plat.id,
        name: plat.name,
        image: plat.image,
        price: plat.price,
        size: selectedSize,
        quantity: quantity,
        total: (plat.price * quantity).toFixed(2)
      };

      
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      
      const existing = cart.find(
        item => item.id === plat.id && item.size === selectedSize
      );
      if (existing) {
        existing.quantity += quantity;
        existing.total = (existing.quantity * existing.price).toFixed(2);
      } else {
        cart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload()
      alert(`${plat.name} a été ajouté au panier !`);
    });
  })
  .catch(error => console.error("Erreur :", error));
