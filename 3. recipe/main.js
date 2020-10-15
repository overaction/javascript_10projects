'use strict';
const meals = document.getElementById("meals");
const favMeals = document.getElementById('fav-meals');

const searchBtn = document.getElementById('search');
const searchTerm = document.getElementById('search-term');
const mealPopup = document.getElementById('meal-popup');
const mealInfo = document.getElementById('meal-info');

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
                <div class="meal-header">
                    ${random ? `<span class="random">
                    Random Recipe
                    </span>` : ''}
                    <img src=${mealData.strMealThumb} alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
    `;

    const loveBtn = meal.querySelector('.meal-body .fav-btn');
    loveBtn.addEventListener('click', () => {
        if(loveBtn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            loveBtn.classList.remove('active');
        }
        else {
            addMealToLS(mealData.idMeal);
            loveBtn.classList.add('active');
        }
        fetchFavMeals();
    })
    meals.appendChild(meal);
}


// LocalStorage
function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function addMealToFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" 
        alt="${mealData.strMeal}"
        data-index = ${mealData.idMeal}>
        <span>${mealData.strMeal}</span>
        <button class="clear">
        <i class="fas fa-window-close"></i>
        </button>
    `;
    const clearBtn = favMeal.querySelector('.clear');
    clearBtn.addEventListener('click', () => {
        const loveBtn = document.querySelector('.meal-body .fav-btn');
        loveBtn.classList.remove('active');
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    })

    favMeals.appendChild(favMeal);
}

function updateMealInfo(metaData) {
    mealPopup.classList.remove('hidden');
    mealInfo.innerHTML = `
    <h1>Meal Title</h1>
    <img src="${metaData.strMealThumb}" alt="${metaData.strMeal}">
    <button id="close-popup">
        <i class="far fa-window-close"></i>
    </button>
    <p>
        ${metaData.strInstructions}        
    </p>
    `;
    const popupCloseBtn = document.getElementById('close-popup');
    popupCloseBtn.addEventListener('click', () => {
        mealPopup.classList.add('hidden');
    })
}

async function fetchFavMeals() {
    // cleaning favorite meals
    favMeals.innerText = '';
    const mealIds = getMealsFromLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addMealToFav(meal)
    }
    // add them to the screen
}



async function getRandomMeal() {
    const fetchRandomMeal = await mealFetch(`https://www.themealdb.com/api/json/v1/1/random.php`,0);
    const jsonRandomMeal = await mealToJson(fetchRandomMeal);
    const randomMeal = jsonRandomMeal.meals[0];
    console.log(randomMeal);
    addMeal(randomMeal,true);
}

async function getMealById(id) {
    const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const jsonMeal = await meal.json();
    const Idmeal = jsonMeal.meals[0];
    
    return Idmeal;
}

async function getMealsBySearch(name) {
    const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const jsonMeals = await meals.json();
    const searchMeal = jsonMeals.meals;
    
    return searchMeal;
}

function mealFetch(url,time) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const mealFetch = fetch(url);
            resolve(mealFetch);
        },time);
    });
}

function mealToJson(meal) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const mealJson = meal.json();
            resolve(mealJson);
        },0);
    })
}

getRandomMeal();
fetchFavMeals();

searchBtn.addEventListener('click', async () => {
    const search = searchTerm.value;
    
    // clean container
    const searchedMeals = document.getElementById('meals');
    searchedMeals.innerText = '';

    const meals = await getMealsBySearch(search);
    if(meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        })
    }
})

favMeals.addEventListener('click', async (e) => {
    const favMeal_id = e.target.dataset.index;
    console.log(favMeal_id);
    if(!favMeal_id) return; 
    const favMeal_clicked = await getMealById(favMeal_id);
    updateMealInfo(favMeal_clicked);
})


