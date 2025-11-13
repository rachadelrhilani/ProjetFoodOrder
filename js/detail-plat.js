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
fetch("../data/menu.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur de chargement du fichier JSON");
    }
    return response.json();
  })
  .then(data => {
    const plat = data.find(item => item.id === platId);
    console.log(plat);
    const container = document.getElementById("plat-content");
    if (!plat) {
      container.innerHTML = "<p class='text-center text-red-500'>Plat introuvable.</p>";
      return;
    }
    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold mb-6 text-center">${plat.name}</h3>
        <img src="${plat.image}" alt="${plat.name}" 
  class=" shadow-md mx-auto mb-6 w-[600px] max-w-2xl h-[590px] object-cover detail" />
      </div>

      <p class="text-gray-700 text-left leading-relaxed mb-6">
        ${plat.description}
      </p>

    <div>
  <div>
    <strong class="text-left block mb-2">Ingrédients :</strong>
     
    <div class="flex justify-between items-start gap-6">
    
     
      <div class="flex flex-col gap-2">
        
        <input 
          type="number" 
          min="1" 
          value="1"
          class="w-24 p-1 border border-gray-300 rounded text-black"
        />

        
        <select 
          class="p-1 border border-gray-300 rounded text-black"
        >
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <!-- Total prix -->
        <span class="bg-orange-500 text-white px-3 py-1 rounded text-center">
          Total : 0 €
        </span>
      </div>

    </div>
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
