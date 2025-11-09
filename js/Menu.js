const Menu_url = '../Menu.json'

const BreakfastCard = document.getElementById('Breakfast-card');
// const buttonWrap = document.getElementById('button-wrap');

async function data() {
    try{
        const res = await fetch(Menu_url);
        if(!res.ok) throw new Error('response is not ok');
        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error : ', error);
    }
} 

const loadData = async () => {
    const cleanData = await data();
    const lunch = cleanData.filter((meal) => meal.mealType === "Breakfast");

    let index = 0;

    const renderCard = () => {
        BreakfastCard.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'flex flex-row gap-5';
        card.innerHTML = `
            <img src="${lunch[index].image}" class="w-20 h-20">
            <div class="mt-3">
                <p class="font-extrabold text-2xl">${lunch[index].name}</p>
                <p>${lunch[index].description}</p>
            </div>
            <p class="font-extrabold text-yellow-500 mt-5 text-2xl">$${lunch[index].price}</p>
        `;
        BreakfastCard.append(card);
    }

    const swipRight = document.getElementById('swipRight');
    
    swipRight.addEventListener('click', () => {
        index++;
        if(index >= lunch.length) index = 0;
        renderCard();
    });
    
    const swipLeft = document.getElementById('swipLeft');
    swipLeft.addEventListener('click', () => {
        index--;
        if(index < 0) index = lunch.length - 1;
        renderCard();
    })
    
    // buttonWrap.append(swipRight);
    // buttonWrap.append(swipLeft);

    renderCard();
}

loadData();