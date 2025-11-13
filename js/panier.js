const pay = document.querySelector(".paiment ");
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
// propagation
panier.addEventListener("click", (e) => e.stopPropagation());
pay.addEventListener("click", (e) => e.stopPropagation());
//the calcul stuff
const platCount = document.querySelector(".plat-count");
const plus = document.querySelector(".increase");
const minus = document.querySelector(".decrease");
const prix = document.querySelector(".price-tag");

platCount.value = 0;
plus.addEventListener("click", () => {
  platCount.value = parseInt(platCount.value) + 1;
  prix.innerHTML = ` $ ${parseInt(platCount.value) * 100}`;
});
minus.addEventListener("click", () => {
  if (platCount.value == 1) {
  } else {
    platCount.value = parseInt(platCount.value) - 1;

    prix.innerHTML = ` $ ${parseInt(platCount.value) * 100}`;
  }
});

prix.innerHTML = ` $ ${parseInt(platCount.value) * 100}`;
