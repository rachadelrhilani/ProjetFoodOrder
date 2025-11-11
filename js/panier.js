const pay = document.querySelector(".paiment ");
const panier = document.querySelector(".panier");
const Z =document.querySelector(".Z"); 

function toPay() {
  pay.style.display = "flex";
  panier.style.display = "none";
  
}

function panierOn() {
  Z.style.display = "flex"
  panier.style.display = "flex";
}
Z.addEventListener("click", () => {
  panier.style.display = "none";
  Z.style.display   = "none";
  pay.style.display = "none";
})
