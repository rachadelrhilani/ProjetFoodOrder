const Menu_url = '../Menu.json';

async function fetchMenu() {
  const res = await fetch(Menu_url);
  if (!res.ok) throw new Error('Failed to fetch menu.json');
  return await res.json();
}

const loadData = async () => {
  const data = await fetchMenu();

  // Separate meal types
  const meals = {
    Breakfast: data.filter(m => m.mealType === "Breakfast"),
    Lunch: data.filter(m => m.mealType === "Lunch"),
    Dinner: data.filter(m => m.mealType === "Dinner")
  };

  // Render helper (works for both)
  function setupMealSection(type) {
    const cardContainer = document.getElementById(`${type}-card`);
    const leftBtn = document.querySelector(`#${type}-wrap-buttons #swipLeft`);
    const rightBtn = document.querySelector(`#${type}-wrap-buttons #swipRight`);
    let index = 0;

    const renderCard = () => {
      const meal = meals[type][index];
      cardContainer.innerHTML = `
        <div class="flex flex-row gap-5">
          <img src="${meal.image}" class="w-20 h-20">
          <div class="mt-3">
            <p class="font-extrabold text-2xl">${meal.name}</p>
            <p>${meal.description}</p>
          </div>
          <p class="font-extrabold text-yellow-500 mt-5 text-2xl">$${meal.price}</p>
        </div>
      `;
    };

    rightBtn.addEventListener('click', () => {
      index = (index + 1) % meals[type].length;
      renderCard();
    });

    leftBtn.addEventListener('click', () => {
      index = (index - 1 + meals[type].length) % meals[type].length;
      renderCard();
    });

    renderCard();
  }

  const dispo = data.filter(e => e.availability === true)
  console.log("availability meals : ", dispo);

  const reranderCard = (data) => {
    const dispoCard = document.getElementById('disponible-card');
    dispoCard.innerHTML = data.map(dispoMeal => `
      <div  class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="${dispoMeal.image}" alt="meal">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${dispoMeal.name}</div>
            <p class="text-gray-700 text-base">${dispoMeal.description}</p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">available</span>
          </div>
      </div>
    `).join("")
  }
  reranderCard(dispo);

  document.getElementById('search-input').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (searchValue === '') {
      reranderCard(dispo);
    } else {
      const filerInput = dispo.filter(meal => 
        meal.name.toLowerCase().includes(searchValue)
      )
      reranderCard(filerInput);
    }
  });

  setupMealSection("Breakfast");
  setupMealSection("Lunch");
  setupMealSection("Dinner")
};

loadData();
