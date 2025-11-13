

const pay = document.querySelector(".paiment");
const panier = document.querySelector(".panier");
const Z = document.querySelector(".Z");

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

panier.addEventListener("click", (e) => e.stopPropagation());
pay.addEventListener("click", (e) => e.stopPropagation());

const platContainer = document.querySelector(".p-content");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function creePlat() {
  platContainer.innerHTML = "";
  cart.forEach((item, i) => {
    const plat = document.createElement("div");
    plat.className = "panier-plat flex justify-between items-center w-4/4 p-3.5";
    plat.innerHTML = `
      <img class="plat-image" src="${item.image}" alt="plat" />
      <h2 class="text-3xl plat-title">${item.name}</h2>
      <div class="pm">
        <button class="text-4xl decrease">-</button>
        <input readonly type="number" min="1" class="text-2xl plat-count" value="${item.quantity || 1}" />
        <button class="text-4xl increase">+</button>
      </div>
      <select class="text-3xl plat-size">
        <option value="S">S</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <div class="pc flex justify-between w-1/4">
        <label class="text-3xl price-tag">$${((item.quantity || 1) * parseFloat(item.price)).toFixed(2)}</label>
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

    count.value = item.quantity || 1;
    sizeSelect.value = item.size || "S";

    inc.addEventListener("click", () => {
      count.value = parseInt(count.value) + 1;
      price.textContent = `$${(parseInt(count.value) * parseFloat(item.price)).toFixed(2)}`;
      cart[i].quantity = parseInt(count.value);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    dec.addEventListener("click", () => {
      if (parseInt(count.value) > 1) {
        count.value = parseInt(count.value) - 1;
        price.textContent = `$${(parseInt(count.value) * parseFloat(item.price)).toFixed(2)}`;
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
  });
}

creePlat();
