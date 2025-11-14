const pay = document.querySelector(".paiment");
const panier = document.querySelector(".panier");
const Z = document.querySelector(".Z");
const btnConfirmer = document.querySelector(".c-achat");

function ticket() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let y = 20; 
    let total = 0;

    doc.setFontSize(18);
    doc.text("Reçu de Commande", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(14);
    doc.text("Panier:", 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.text("Plat", 10, y);
    doc.text("Quantité", 60, y);
    doc.text("Taille", 100, y);
    doc.text("Prix", 140, y);
    y += 4;

    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 6;

    cart.forEach(item => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        total += itemTotal;

        if (item.image) {
            const img = new Image();
            img.src = item.image;
            img.onload = () => {
                doc.addImage(img, 'JPEG', 10, y - 4, 20, 20); 
                doc.text(item.name, 35, y); 
            };
        } else {
            doc.text(item.name, 10, y);
        }

        doc.text(item.quantity.toString(), 60, y);
        doc.text(item.size || "-", 100, y);
        doc.text(itemTotal.toFixed(2) + " Dhs", 140, y);
        y += 10;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    doc.setFontSize(14);
    doc.text(`Total: ${total.toFixed(2)} Dhs`, 10, y + 10);

    doc.save("panier.pdf");
};



//total
let total = 0;

function toPay() {
  pay.style.display = "flex";
  panier.style.display = "none";
}

function panierOn() {
  Z.style.display = "flex";
  panier.style.display = "flex";
}

Z.addEventListener("click", () => {
  panier.style.display = "none";
  Z.style.display = "none";
  pay.style.display = "none";
});

//propagation
panier.addEventListener("click", (e) => e.stopPropagation());
pay.addEventListener("click", (e) => e.stopPropagation());
//
const platContainer = document.querySelector(".p-content");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function creePlat() {
  platContainer.innerHTML = "";
  cart.forEach((item, i) => {
    const plat = document.createElement("div");
    plat.className =
      "panier-plat flex justify-between items-center w-4/4 p-3.5";
    plat.innerHTML = `
      <img class="plat-image" src="${item.image}" alt="plat" />
      <h2 class="text-3xl plat-title">${item.name}</h2>
      <div class="pm">
        <button class="text-4xl decrease">-</button>
        <input readonly type="number" min="1" class="text-2xl plat-count" value="${
          item.quantity
        }" />
        <button class="text-4xl increase">+</button>
      </div>
      <select class="text-3xl plat-size">
        <option value="S">S</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <div class="pc flex justify-between w-1/4">
        <label class="text-3xl price-tag">${(
          item.quantity * parseFloat(item.price)
        ).toFixed(2)}</label>
        <button class="text-3xl cancel">X</button>
      </div>
    `;
    platContainer.appendChild(plat);

    const count = plat.querySelector(".plat-count");
    const price = plat.querySelector(".price-tag");
    const inc = plat.querySelector(".increase");
    const dec = plat.querySelector(".decrease");
    const sizeSelect = plat.querySelector(".plat-size");
    const cancelBtn = plat.querySelector(".cancel");

    count.value = item.quantity;
    sizeSelect.value = item.size;

    inc.addEventListener("click", () => {
      count.value = parseInt(count.value) + 1;
      price.textContent = `${(
        parseInt(count.value) * parseFloat(item.price)
      ).toFixed(2)}`;
      cart[i].quantity = parseInt(count.value);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    dec.addEventListener("click", () => {
      if (parseInt(count.value) > 1) {
        count.value = parseInt(count.value) - 1;
        price.textContent = `${(
          parseInt(count.value) * parseFloat(item.price)
        ).toFixed(2)}`;
        cart[i].quantity = parseInt(count.value);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

    sizeSelect.addEventListener("change", () => {
      cart[i].size = sizeSelect.value;
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    cancelBtn.addEventListener("click", () => {
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      creePlat();
    });
    total += parseFloat(price.textContent);
    console.log(total);

    const planNum = document.querySelector(".plat-num");
    const totalPrix = document.querySelector(".total-prix");

    planNum.innerHTML = `${cart.length} plats `;
    totalPrix.innerHTML = `${parseFloat(total).toFixed(2)} Dhs`;
  });
/////////////////
  

}
creePlat();

//REGEX

btnConfirmer.addEventListener("click", () => {
  const nom = document.querySelector(".pay-nom");
  const prenom = document.querySelector(".pay-prenom");
  const email = document.querySelector(".in-email");
  const l1 = document.querySelector(".pay-l1");
  const ville = document.querySelector(".pay-v");
  const region = document.querySelector(".pay-r");
  const postal = document.querySelector(".pay-pos");


if (nom.value.trim() === "") {
    alert("Le champ Nom est obligatoire.");
} else if (prenom.value.trim() === "") {
    alert("Le champ Prenom est obligatoire.");
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    alert("Veuillez entrer une adresse email valide.");
} else if (l1.value === "") {
    alert("Ligne 1 est obligatoire.");
} else if (ville.value === "") {
    alert("La ville est obligatoire.");
} else if (region.value === "") {
    alert("La région est obligatoire.");
} else if (!/^[0-9]{4,6}$/.test(postal.value)) {
    alert("Le code postal doit contenir uniquement des chiffres (4 à 6 chiffres).");
} else {
    alert("Prenez votre reçu");
btnConfirmer.addEventListener("click", ticket())
}
});
