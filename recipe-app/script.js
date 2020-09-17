async function getRandomRecipe() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

    return fetchData(URL);
}

async function fetchData(url) {
    const response = await fetch(url);
    const recipes = await response.json();
    const recipe = recipes.meals[0];

    const res = {
        id: recipe.idMeal,
        title: recipe.strMeal,
        img: recipe.strMealThumb
    }

    // console.log('res: ', res);
    return res;
}

async function getRecipeById(recipeId) {
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    return fetchData(URL);
}

async function getRecipeBySearch() {
    // https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

    const recipeToSearch = document.getElementById('searchInput');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeToSearch.value}`;

    const recipe = await fetchData(url);
    displayRecipe(recipe);
}

function addRecipeToFavorite() {
    console.log('addRecipeToFavorite');

    const recipe = document.getElementById('recipe-id');
    const recipeId = recipe.getAttribute('data-recipe-id');
    
    const favBtn = document.getElementsByClassName('fav-btn')[0]

    if (favBtn.classList.contains('active')) {
        localStorage.removeItem(recipeId);
        favBtn.classList.remove('active');
    } else {
        localStorage.setItem(recipeId, recipeId);
        favBtn.classList.add('active');
    }

    displayFavorites();
}

async function displayFavorites() {
    const lsItems = Object.keys(localStorage);

    if (lsItems.length === 0) {
        return;
    }

    const favorites = document.getElementById('favorites');

    let pElement;
    if (document.getElementsByTagName('p').length === 0) {
        pElement = document.createElement('p');
        pElement.innerText = 'Favorite Meals';
        favorites.appendChild(pElement);
    }
    
    let ulElement = document.createElement('ul');

    for (const key of lsItems) {
        const recipe = await getRecipeById(key);

        const imgElement = document.createElement('img');
        imgElement.src = recipe.img;
        imgElement.setAttribute('data-recipe-id', recipe.id);

        const spanElement = document.createElement('span');
        spanElement.innerText = recipe.title;

        const liElement = document.createElement('li');
        liElement.addEventListener('click', 
            function(e) { 
                if(e.target && e.target.nodeName == "IMG") {
                    displayRecipeById(e.target.getAttribute('data-recipe-id'));
                } 
            }
        );
        liElement.appendChild(imgElement);
        liElement.appendChild(spanElement);

        ulElement.appendChild(liElement);
    }

    const _ulElement = document.getElementsByTagName('ul')[0];
    if (_ulElement) {
        favorites.removeChild(_ulElement);
    }
    favorites.appendChild(ulElement);
}

async function displayRecipeById(recipeId) {
    console.log('displayRecipe: ', recipeId);
    const recipe = await getRecipeById(recipeId);

    displayRecipe(recipe);
    const favBtn = document.getElementsByClassName('fav-btn')[0];
    favBtn.classList.add('active');
}

async function displayRecipe(recipe) {
    const recipeTitle = document.getElementById('recipe-title');
    const recipePhoto = document.getElementById('recipe-photo');
    const recipeId = document.getElementById('recipe-id');

    recipeTitle.innerText = recipe.title;
    recipePhoto.src = recipe.img;
    recipeId.setAttribute('data-recipe-id', recipe.id);
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', getRecipeBySearch);

const add2FavBtn = document.getElementById("add2FavBtn");
add2FavBtn.addEventListener('click', addRecipeToFavorite);

async function recipeOfTheDay() {
    const recipe = await getRandomRecipe();
    displayRecipe(recipe);
}

displayFavorites();
recipeOfTheDay();
