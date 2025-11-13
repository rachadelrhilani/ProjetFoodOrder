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
    <div 
      class="flex flex-row gap-5 cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition"
      data-id="${meal.id}"
    >
      <img src="${meal.image}" class="w-20 h-20 rounded-lg object-cover">
      <div class="mt-3">
        <p class="font-extrabold text-2xl">${meal.name}</p>
        <p>${meal.description}</p>
      </div>
      <p class="font-extrabold text-yellow-500 mt-5 text-2xl">$${meal.price}</p>
    </div>
  `;

      const card = cardContainer.querySelector("[data-id]");
      card.addEventListener("click", () => {
        window.location.href = `Detailplat.html?id=${meal.id}`;
      });
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

  setupMealSection("Breakfast");
  setupMealSection("Lunch");
  setupMealSection("Dinner")
};

loadData();
