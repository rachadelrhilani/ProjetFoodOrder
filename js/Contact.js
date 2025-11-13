const form = document.querySelector('form');
const nom = document.getElementById('name');
const email = document.getElementById('email');
const tele= document.getElementById('phone');
const message= document.getElementById('message');

const nomV = /^[a-zA-Z\s]{3,30}$/; 
const emailV= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneV= /^[0-9\s\+\-]{9,10}$/;
const messageV= /^.{10,500}$/;
function affichage(input, message) {
    const err = input.parentElement.querySelector('.error-text');
    if (err) {
        err.remove();
    }
    const messE = document.createElement('p');
    messE.className = 'error-text text-red-500 text-sm mt-1';
    messE.textContent = message;
    input.parentElement.appendChild(messE);
    input.style.borderColor = 'red';
}
function verif(input) {
    const messE= input.parentElement.querySelector('.error-text');
    if (messE) {
        messE.remove();
    }
    input.style.borderColor='';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();  
    let valid = true;
    verif(nom);
    verif(email);
    verif(tele);
    verif(message);
    if (!nomV.test(nom.value)) {
        affichage(nom, 'Le nom doit contenir entre 3 et 30 lettres');
        valid = false;
    }
    
    if (!emailV.test(email.value)) {
        affichage(email, 'Attention votre email invalide');
        valid = false;
    }
    if (!phoneV.test(tele.value)) {
        affichage(tele, 'Numero de telephone est invalide doit contenir 10 chiffres)');
        valid = false;
    }
    if (!messageV.test(message.value)) {
        affichage(message, 'Le message doit contenir entre 10 et 500 caracteres');
        valid = false;
    }
    if (valid) {
        alert('Votre message est envoye avec succes!');
        form.reset(); 
    }
});


