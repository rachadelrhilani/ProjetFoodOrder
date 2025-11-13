# FoodOrder+ – Plateforme de Commande en Ligne

## Contexte du projet
Le restaurant **FoodOrder+** souhaite lancer une **plateforme web interactive** permettant à ses clients de commander leurs plats en ligne de manière fluide et intuitive.  
L’application offrira une **expérience utilisateur moderne** grâce à une navigation dynamique, une personnalisation des plats, un panier intelligent et une intégration d’API pour récupérer les menus en temps réel.  

**Objectif principal :**
Créer une interface **réactive**, **rapide** et **centrée sur l’expérience client**.

---

## Équipe de développement
- **Rachad El Rhilani**
- **Abdelghafor**
- **Fatiha**
- **Ayman**
- **Ziyad**

---

## User Stories – FoodOrder+
- L’utilisateur peut découvrir les plats du jour et les promotions.  
- L’utilisateur peut parcourir le menu et rechercher un plat facilement.  
- L’utilisateur peut filtrer les plats par catégorie.  
- L’utilisateur peut consulter les détails d’un plat et le personnaliser.  
- L’utilisateur peut ajouter, modifier ou supprimer des plats de son panier.  
- L’utilisateur peut renseigner ses informations personnelles et confirmer sa commande.  
- L’utilisateur peut télécharger ou imprimer son ticket de commande.  
- L’utilisateur peut contacter le restaurant et consulter la FAQ.

---

## Rôles & Missions

###  Conception & Design (D & M)
- Création de **maquettes modernes et ergonomiques** (Figma).  
- Intégration d’un **carrousel interactif** pour les plats du jour et les offres spéciales.  

### Développement
- **Carrousel dynamique** pour les plats populaires.  
- **Galerie du menu** : affichage des plats sous forme de cartes interactives (images, prix, ingrédients).  
- **Validation REGEX** : contrôle des champs (nom, email, téléphone, adresse).  
- **Filtrage et recherche** par catégorie et mot-clé.  
- **Personnalisation** : choix de la taille et de la quantité.  
- **Panier interactif** sous forme de pop-up avec total automatique.  
- **Fenêtre Paiement** : pop-up déclenchée depuis le panier pour la saisie des informations.  
- **Ticket PDF** : génération d’un ticket téléchargeable et imprimable.  
- **Local Storage** : sauvegarde du panier et des préférences utilisateur.  
- **Fetch API** : récupération des plats depuis `Menu.json`.  
- **Pagination fluide** : affichage dynamique (ex. 8 plats par page).

---

## Pages et fenêtres du site

### Page Accueil
- Carrousel mettant en avant les plats du jour ou les menus spéciaux.  
- Présentation du restaurant et du concept FoodOrder+.  
- Accès rapide aux sections principales : Menu, Commande, Contact.  
- Témoignages / Avis clients.

---

### Page Menu
- Liste complète des plats disponibles.  
- Filtres par type de plat (Entrée, Plat, Dessert, Boisson).  
- Barre de recherche et pagination dynamique.  
- Bouton **“Voir les détails”** pour accéder à la fiche d’un plat.

---

### Page Détails du Plat *(développée par Rachad El Rhilani)*
**Fonctionnalités :**
- Description complète du plat (nom, image, ingrédients).  
- Options de personnalisation : **taille** et **quantité**.  
- **Calcul automatique du prix** selon les choix.  
- Bouton **“Ajouter au panier”** avec enregistrement des options.  

**Technologies utilisées :**
- **HTML5 / TailwindCSS / JavaScript**.  
- **Fetch API** pour charger les données depuis `Menu.json`.  
- **DOM dynamique** pour afficher le plat et actualiser le prix.

---

### Pop-up Panier
- Affiche les plats ajoutés par l’utilisateur.  
- Permet de **modifier ou supprimer** un plat directement.  
- Le **total TTC** se met à jour automatiquement.  
- Bouton **“Commander”** qui **bascule vers la pop-up Paiement**.  
- Fonctionne sans rechargement de page (grâce à JavaScript).

---

### Pop-up Paiement
- S’ouvre **après clic sur “Commander”** dans le panier.  
- Formulaire avec **validation Regex** : Nom complet, Adresse, Téléphone, Email.  
- Mode de paiement : **Paiement à la livraison (par défaut)**.  
- Résumé du panier affiché en haut du pop-up.  
- Bouton **“Confirmer la commande”** qui génère un ticket PDF.

---

###  Page Ticket
- Génération automatique d’un **ticket de commande PDF**.  
- Détail complet : plats, quantités, options, prix total.  
- Options **Télécharger** et **Imprimer**.

---

### Page À propos / Contact
- Présentation du restaurant et du chef.  
- Formulaire de contact (validation JS avec Regex).  
- Informations : adresse, téléphone, réseaux sociaux.  
- Carte Google Maps et **FAQ simple**.

---

## Format de données (JSON)
Chaque plat est représenté par un objet simple :

```json
{
    "id": 1,
    "name": "Pizza Margherita",
    "category": "Plat",
    "mealType": "Lunch",
    "description": "Pizza traditionnelle avec sauce tomate, mozzarella et basilic frais.",
    "price": 8.99,
    "image": "/images/menu-1.jpg.png",
    "size": ["S", "M", "L", "XL"],
    "availability": true,
    "ingredients": ["Tomate", "Mozzarella", "Huile d’olive", "Basilic"]
}
