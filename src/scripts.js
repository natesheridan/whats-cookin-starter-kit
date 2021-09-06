import styles from './styles.css';
import UserData from './classes/UserData.js';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Ingredient from './classes/Ingredient.js';
import rightArrow from './data/assets/Right-arrow.svg';
import pancakes from './data/assets/pancakes.svg';
import starActive from './data/assets/star-active.svg';
import star from './data/assets/star.svg';
// import {usersData} from './data/users.js';
// import {recipeData} from './data/recipes.js';
import usersData from './apiCalls.js';
import ingredientsData from './apiCalls.js';
import recipeData from './apiCalls.js';
import fetchUsersData from './apiCalls.js';
import fetchRecipeData from './apiCalls.js';
import fetchIngredientsData from './apiCalls.js';
import apiCalls from './apiCalls.js';

// BUTTONS & SECTIONS //

const allRecipeGrid = document.querySelector('#allRecipeGrid');
const mainContent = document.querySelector('#mainContent');
const allRecipeContainer = document.querySelector('#allRecipeContainer');
const allRecipes = document.querySelector('#allRecipesButton');
const recipeGrid = document.querySelector('#recipeGrid');
const contentContainer = document.querySelector('.content-container');
const searchSubmitBtn = document.querySelector('.search-submit-btn');
const searchFieldInput = document.querySelector('.search-field');
const searchFavesInput = document.querySelector('#searchFavesByName');
const fullRecipe = document.querySelector('.full-recipe-container');
const recipeFormTitle = document.querySelector('#recipeFormTitle');
const recipeFormImage = document.querySelector('#recipeFormImage');
const recipeFormIngredient = document.querySelector('#recipeFormIngredient');
const unitSelection = document.querySelector('#unitSelection');
const ingredientAmount = document.querySelector('#ingredientAmount');

const homeButton = document.querySelector('#homeButton');
const savedRecipesButton = document.querySelector('#savedRecipesButton');
const addRecipeButton = document.querySelector('#addRecipeButton');
const addRecipeForm = document.querySelector('#addRecipeForm');
const loginPopup = document.querySelector('#loginPopup');
const loginButton = document.querySelector('#loginButton');
const plusButton = document.querySelector('#plusButtonContainer');
const submitRecipeButton = document.querySelector('#submitRecipe');
const addIngredientButton = document.querySelector('#plusButtonContainer');

// FILTER CHECKBOXES && SEARCH ARRAY //

const filters = document.querySelector('#filters');
let currentUser;
let filterSelection = [];
let addedIngredients = [];

// EVENT LISTENERS //

searchSubmitBtn.addEventListener('click', searchByName);
allRecipes.addEventListener('click', viewAllRecipes);
contentContainer.addEventListener('click', getDirections);

homeButton.addEventListener('click', showHomeView);
addRecipeButton.addEventListener('click', showRecipeForm);
loginButton.addEventListener('click', showLogin);
savedRecipesButton.addEventListener('click', showSavedRecipes);
filters.addEventListener('click', filterRecipes);
plusButton.addEventListener('click', addIngredient);
submitRecipeButton.addEventListener('click', addNewRecipe);
addIngredientButton.addEventListener('click', addIngredient);
searchFavesSubmitBtn.addEventListener('click', searchFaves);
window.addEventListener('load', setData);

// MAIN FUNCTIONS //
//
// window.onload = (event) => {
//   apiCalls.getData();
//   Promise.all([usersData, ingredientsData, recipeData]);
// }

function setData() {
  // fetchUsersData();
  // fetchIngredientsData();
  // fetchRecipeData();
  // Promise.all([usersData, ingredientsData, recipeData])
  // .then(data => apiCalls.getData());
  // fetchUsersData();
  // fetchIngredientsData();
  // fetchRecipeData();
  apiCalls.getData()
  .then(data => data[0].usersData = usersData)
  console.log(usersData.usersData);


    // .then(promise => {
    //   let userData = promise[0]['usersData'];
    //   let ingredientData = promise[1]['ingredientsData'];
    //   let recipeData = promise[2]['recipeData'];
    //   console.log(promise);
    //   let userRepo = new UserData(userData);
    //   let recipeRepo = new RecipeRepository(recipeData);
    //   // currentUser = new
    //   // console.log(userData);
    //   // console.log(recipeRepo);
    //   // console.log(ingredientData);
    // })
  // generateRandomUser();
  // console.log(userData);
  // console.log(recipeRepo);
  // console.log(ingredientData);
}

// function getData() {
//   fetchUsersData();
//   fetchIngredientsData();
//   fetchRecipeData();
// }

function filterRecipes() {
  // event.preventDefault();
  if (event.target.value) {
    let value = event.target.value.toLowerCase()
    if (filterSelection.includes(value)) {
      let index = filterSelection.indexOf(value)
      filterSelection.splice(index, 1)
      return;
    }
    filterSelection.push(value);
    searchByTag(recipeData, filterSelection);
  }
}

function addIngredient() {
  let ingredient = recipeFormIngredient.value;
  let unit = unitSelection.value;
  let unitCount = ingredientAmount.value;
  addedIngredients.push(`${ingredient}: ${unitCount} ${unit}`);
  recipeFormIngredient.value = null;
  unitSelection.value = null;
  ingredientAmount.value = null;
}

function generateRandomNumber() {
  return Math.floor(Math.random()*90000) + 10000;
}

function addNewRecipe() {
  let titleField = recipeFormTitle.value;
  let imageField = recipeFormImage.value;
  let ingredients = recipeFormIngredient.value;
  let unitField = unitSelection.value;
  addIngredient();
  let newRecipe = new Recipe({id: generateRandomNumber(), name: titleField, image: imageField, ingredients: [addedIngredients]});

  console.log(newRecipe);a
  recipeData.push(newRecipe);
  addedIngredients = [];
}

function viewAllRecipes() {
  show(allRecipeContainer);
  hide(addRecipeForm);
  hide(recipeGrid);
  show(allRecipeGrid);
  hide(searchFavesInput);
  hide(searchFavesSubmitBtn);

  let recipeRepo = new RecipeRepository(recipeData);
  allRecipeGrid.innerHTML = ""
  const viewAllRecipes = recipeRepo.recipeData.reduce((acc, recipe) => {
    let buttonClasses = "favorite-star"
    let idMap = currentUser.favoriteRecipes.map((faveItem) => faveItem.id)
    if (idMap.includes(recipe.id)){
      buttonClasses = "favorite-star is-favorite"
    }
    allRecipeGrid.innerHTML +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       <button type="favoriteStar" name="favoriteStar" class="${buttonClasses}" id="faveBtn-${recipe.id}">♡</button>
       </article>`

      return acc;
    }, []);
    return viewAllRecipes;
};

function showHomeView() {
  show(recipeGrid);
  generateRandomHomeViewRecipes();
  hide(addRecipeForm);
  hide(allRecipeContainer);
  hide(allRecipeGrid);
  // contentContainer.childNode = recipeGrid;
  // fullRecipeContainer.classList.add('push-to-back');
  // contentContainer.removeChild(fullRecipeContainer);
  // contentContainer.innerHTML = recipeGrid.innerHTML;
  show(mainContent);
  hide(searchFavesSubmitBtn);
  hide(searchFavesByName);
}

function showRecipeForm() {
  show(addRecipeForm);
  hide(recipeGrid);
  hide(allRecipeContainer);
  hide(fullRecipeContainer);
  hide(searchFavesSubmitBtn);
  hide(searchFavesByName);
}

function showLogin() {
  loginPopup.classList.toggle('hidden');
}

function showSavedRecipes() {
  populateCards(currentUser.favoriteRecipes);
  show(searchFavesSubmitBtn);
  show(searchFavesByName);
}

function getDirections(event){
  console.log(event)
  if(event.target.classList.contains('favorite-star')){
    addToFavorites();
    return
  };
  if(event.target.classList.contains('content-container')){
    return
  }
  if(event.target.classList.contains('all-recipe-grid')){
    return
  }

  allRecipeGrid.innerHTML = "";
  let targetID = event.target.closest('.mini-recipe').id;
  let newRecipeInfo = recipeData.find(recipe => recipe.id === Number(targetID));
  console.log(newRecipeInfo)
  let selectedRecipe = new Recipe(newRecipeInfo);

  selectedRecipe.ingredients = selectedRecipe.ingredients.map((element) => {
    let ingredient = new Ingredient(element)
    return ingredient
  })
  let instructions = selectedRecipe.instructions.map((element) => {
    return element.instruction
  });

  let allIngredients = selectedRecipe.ingredients.map((element) => {
    let name = element.name;
    let amount = element.quantity.amount;
    let unit = element.quantity.unit;

    return [name, amount, unit]
  })

  let ingredients = allIngredients.reduce((acc, element) => {
    acc += element
    return acc
  }, '')

  let fullRecipe =
    `<h3 class= "full-recipe"> ${selectedRecipe.name}</h3>
    <img src= "${selectedRecipe.image}" alt="${selectedRecipe.name}">
    <p class= "ingredients">${ingredients.split(/[ ,]+/).join(' ,')}</p>
    <p class= "cost">${selectedRecipe.returnCostEstimation()}</p>
    <p class= "instructions">${instructions}</p>`;

  allRecipeGrid.innerHTML = fullRecipe
};


function searchByName(){
  if(searchFieldInput.value ===""){
    popupMessage("Please enter a search term!", 2000, "red")
    return
  }
  let recipeRepo = new RecipeRepository(recipeData);
  let filteredRecipes = recipeRepo.filterByName(searchFieldInput.value)
  if (filteredRecipes.length === 0){

    popupMessage("No results found! Sorry!", 2000, "red")
    return
  }
  populateCards(filteredRecipes)

}

function populateCards(arr){
  show(allRecipeGrid);
  hide(recipeGrid);
  allRecipeGrid.innerHTML = ""
  const recipeCard = arr.reduce((acc, recipe) => {

    let buttonClasses = "favorite-star"
    if (currentUser.favoriteRecipes.includes(recipe)){
      buttonClasses = "favorite-star is-favorite"
    }
    allRecipeGrid.innerHTML +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       <button type="favoriteStar" name="favoriteStar" class="${buttonClasses}" id="fave-${recipe.id}">♡</button>
       </article>`

      return acc;
    }, []);
};

function searchFaves(){
  let searchInput = searchFavesInput.value.toLowerCase();
  let allTags = [];
  recipeData.forEach((element) => {
    element.tags.forEach((tag) => {
      if(!allTags.includes(tag)){
        allTags.push(tag)
      }
    })
  });

  if(allTags.includes(searchInput)){
    let searchedData = currentUser.favoriteRecipes.filter(recipe => recipe['tags'].includes(searchInput));
    populateCards(searchedData)
    return searchedData
  } else {
    let lowerCasedNames = currentUser.favoriteRecipes.map((element) => {
      element.name = element.name.toLowerCase();
      return element
    })
    let searchedData = lowerCasedNames.filter(recipe => recipe['name'].includes(searchInput));
    populateCards(searchedData)
    return searchedData
  }
}

function searchRecipes() {
  let searchInput = searchFavesInput.value;

  if (currentUser.favoriteRecipes.includes('search-name')) {
      return searchData('name')
    } else if (currentUser.favoriteRecipes.includes('search-tag')) {
      return searchData('tags')
    }
};

function searchData(input) {
  let searchInput = searchFavesInput.value;
  let searchedData = currentUser.favoriteRecipes.filter(recipe => recipe[`${input}`].includes(searchInput));
  return searchedData
};

function setUserData(){
  let user = new UserData()



  // if the user login matches the user.name....
  //...then the app populates with that user's info
};


function joinToString(array){
  return array.join(" ")
}


function searchByTag(recipesArray, searchTags){
  let returnedArr = []
  const filteredArray = recipesArray.reduce((acc, recipe) => {

      let tagsString = joinToString(recipe.tags);
      let numOfTags = searchTags.length;
      // console.log(searchTags);
      let testTags = searchTags.reduce((acc, tag) => {
        if (tagsString.toLowerCase().includes(tag.toLowerCase())){
          acc++;
        }
        return acc;
      }, 0)

      let indexMatchAllSearchTags;
      indexMatchAllSearchTags = (numOfTags===testTags)
      // console.log('NUMBER: ', numOfTags, 'TAGS: ', testTags)
      if (indexMatchAllSearchTags){
        returnedArr.push(recipe);
      }

    }, []);
    console.log(returnedArr)
  populateCards(returnedArr)

  return returnedArr;
};

function hide(element){
  element.classList.add('hidden')
}
function show(element){
  element.classList.remove('hidden')
}

function popupMessage(message, timeInMS, color = "gold"){
  let popupContainer = document.querySelector('#popup')
  popupContainer.classList.add(`${color}-popup`)
  popupContainer.innerHTML=`<p>${message}</p>`
  show(popupContainer)

  setTimeout(function(){
      popupContainer.classList.remove(`${color}-popup`)
      hide(popupContainer);
  }, timeInMS)
};

function addToFavorites(){
  const recipeRepo = new RecipeRepository(recipeData);
  let recipeID = event.target.closest('.mini-recipe').id;
  let recipeBtn = event.target.closest('button');
  let fullRecipe = recipeRepo.recipeData.find(recipe => recipe.id === Number(recipeID));
  let selectedRecipe = new Recipe(fullRecipe);
  let index = recipeRepo.recipeData.indexOf(fullRecipe);
  recipeBtn.classList.toggle("is-favorite");
  currentUser.toggleItemInArray('favoriteRecipes', recipeData[index]);
}



function generateRandomUser() {
  const randomUser = Math.floor(Math.random() * usersData.length);
  const user = usersData[randomUser];
  let userDataValue = new UserData(user)
  currentUser = userDataValue
};

function generateRandomHomeViewRecipes(){
  const recipeRepo = new RecipeRepository(recipeData);
  let randomRecipeIndex1 = Math.floor(Math.random() * recipeRepo.recipeData.length)
  let randomRecipeIndex2 = Math.floor(Math.random() * recipeRepo.recipeData.length)
  let randomRecipeIndex3 = Math.floor(Math.random() * recipeRepo.recipeData.length)
  if (randomRecipeIndex2 === randomRecipeIndex1){
    randomRecipeIndex2 = Math.floor(Math.random() * recipeRepo.recipeData.length)
  }
  if (randomRecipeIndex3 === randomRecipeIndex1 || randomRecipeIndex2){
    randomRecipeIndex3 = Math.floor(Math.random() * recipeRepo.recipeData.length)
  }
  recipeGrid.innerHTML = ""
  let title = "<h1 class='home-title'>Featured Recipes</h1>"
  recipeGrid.innerHTML = title;
  console.log(randomRecipeIndex1, randomRecipeIndex2, randomRecipeIndex3)
  let randomRecipesIndex = [randomRecipeIndex1, randomRecipeIndex2, randomRecipeIndex3]
  randomRecipesIndex.forEach((randomRecipeIndex) => {

    let index = randomRecipeIndex
    // let buttonClasses = "favorite-star"
    // let idMap = currentUser.favoriteRecipes.map((faveItem) => faveItem.id)
    // if (idMap.includes(recipe.id)){
    //   buttonClasses = "favorite-star is-favorite"
    // }

   recipeGrid.innerHTML +=
    `<article class="recipe">
    <div class="meal-image">
      <img src="${recipeRepo.recipeData[index].image}" alt="meal image" class="image">
    </div>
    <div class="recipe-content">
      <button type="favoriteStar" name="favoriteStar" class="favorite-star" id="favoriteStar1">♡</button>
      <div class="recipe-info">
        <h2>${recipeRepo.recipeData[index].name}</h2>
      </div>
    </div>
  </article>`

  })
}









generateRandomUser()
generateRandomHomeViewRecipes()
