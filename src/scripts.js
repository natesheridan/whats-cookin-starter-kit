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
import {fetchUsersData, fetchRecipeData, fetchIngredientsData} from './apiCalls.js';
import apiCalls from './apiCalls.js';

// BUTTONS & SECTIONS //

const allRecipeGrid = document.querySelector('#allRecipeGrid');
const mainContent = document.querySelector('#mainContent');
const featuredRecipes = document.querySelector('#featuredRecipes');
const homeTitle = document.querySelector('#homeTitle');
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
const recipesToCookButton = document.querySelector('#recipesToCook');


// FILTER CHECKBOXES && SEARCH ARRAY //

const filters = document.querySelector('#filters');
let currentUser;
let usersData = [];
let recipeData = [];
let ingredientsData = [];
export default ingredientsData;
let filterSelection = [];
let addedIngredients = [];
var selectedRecipeIngredients = [];

// EVENT LISTENERS //

searchSubmitBtn.addEventListener('click', searchByName);
allRecipes.addEventListener('click', viewAllRecipes);
allRecipeGrid.addEventListener('click', getDirections);

homeButton.addEventListener('click', showHomeView);
addRecipeButton.addEventListener('click', showRecipeForm);
loginButton.addEventListener('click', showLogin);
savedRecipesButton.addEventListener('click', showSavedRecipes);
filters.addEventListener('click', filterRecipes);
plusButton.addEventListener('click', addIngredient);
submitRecipeButton.addEventListener('click', addNewRecipe);
addIngredientButton.addEventListener('click', addIngredient);
searchFavesSubmitBtn.addEventListener('click', searchFaves);
recipesToCookButton.addEventListener('click', showRecipesToCook);
window.addEventListener('load', getData);

// MAIN FUNCTIONS //
//
// window.onload = (event) => {
//   apiCalls.getData();
//   Promise.all([usersData, ingredientsData, recipeData]);
// }



function parseData(data){
  usersData = data[0].usersData;
  ingredientsData = data[1].ingredientsData;
  recipeData = data[2].recipeData

  generateRandomUser()
  generateRandomHomeViewRecipes()
}


function getData() {
  return Promise.all([fetchUsersData(), fetchIngredientsData(), fetchRecipeData()])
  .then(data => parseData(data));
}



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
  let newRecipe = new Recipe({id: generateRandomNumber(), name: titleField, image: imageField, ingredients: [addedIngredients]}, ingredientsData);
  recipeData.push(newRecipe);
  addedIngredients = [];
}

function viewAllRecipes() {
  show(filters);
  show(allRecipeContainer);
  hide(addRecipeForm);
  hide(recipeGrid);
  hide(recipeDirectionsContainer);
  show(allRecipeGrid);
  hide(searchFavesInput);
  hide(searchFavesSubmitBtn);
  show(featuredRecipes);
  featuredRecipes.innerHTML = `<h1>All Recipes</h1>`;

  let recipeRepo = new RecipeRepository(recipeData);
  populateCards(recipeRepo.recipeData)
  // allRecipeGrid.innerHTML = ""
  // const viewAllRecipes = recipeRepo.recipeData.reduce((acc, recipe) => {
  //   let buttonClasses = "favorite-star"
  //   let idMap = currentUser.favoriteRecipes.map((faveItem) => faveItem.id)
  //   if (idMap.includes(recipe.id)){
  //     buttonClasses = "favorite-star is-favorite"
  //   }
  //   allRecipeGrid.innerHTML +=
  //     `<article class="mini-recipe" id="${recipe.id}">
  //      <img src= "${recipe.image}" alt= "${recipe.name}">
  //      <p>${recipe.name}</p>
  //      <button type="favoriteStar" name="favoriteStar" class="${buttonClasses} heart-button" id="faveBtn-${recipe.id}">♡</button>
  //      <button type="recipesToCook" name="recipesToCook" class="recipesToCook" id="${recipe.id}">🗓 Cook this week!</button>
  //      </article>`

  //     return acc;
  //   }, []);
  //   return viewAllRecipes;
};

function showHomeView() {
  show(recipeGrid);
  generateRandomHomeViewRecipes();
  hide(addRecipeForm);
  hide(allRecipeContainer);
  hide(allRecipeGrid);
  hide(recipeDirectionsContainer);
  show(mainContent);
  hide(searchFavesSubmitBtn);
  hide(searchFavesByName);
  hide(filters);
  show(featuredRecipes);
  featuredRecipes.innerHTML = `<h1>Featured Recipes</h1>`;
}

function showRecipeForm() {
  show(addRecipeForm);
  hide(recipeGrid);
  hide(allRecipeContainer);
  hide(filters);
  hide(searchFavesSubmitBtn);
  hide(searchFavesByName);
  hide(recipeDirectionsContainer);
  featuredRecipes.innerHTML = `<h1>Add a Recipe</h1>`;
}

function showLogin() {
  loginPopup.classList.toggle('hidden');
}

function showSavedRecipes() {
  populateCards(currentUser.favoriteRecipes);
  hide(recipeDirectionsContainer);
  show(searchFavesSubmitBtn);
  show(searchFavesByName);
  show(filters);
  show(featuredRecipes);
  featuredRecipes.innerHTML = `<h1>Saved Recipes</h1>`;
}

function showRecipesToCook() {
  hide(recipeDirectionsContainer);
  populateCards(currentUser.recipesToCook);
  show(featuredRecipes);
  featuredRecipes.innerHTML = `<h1>Recipes</h1>`
};

function getDirections(event){
  
  if(event.target.classList.contains('favorite-star')){
    addToLibrary();
    return
  };
  
  if(event.target.classList.contains('recipesToCook')){
    addToLibrary();
    return
  }
  
  if(!event.target.parentElement.classList.contains('mini-recipe')){
    return
  }
  selectedRecipeIngredients = [];
  show(recipeGrid);
  hide(allRecipeContainer);
  hide(allRecipeGrid);
  show(recipeDirectionsContainer);
    
  recipeGrid.innerHTML = "";
  let targetID = "";
  targetID = event.target.closest('.mini-recipe').id
  let newRecipeInfo = recipeData.find(recipe => recipe.id === Number(targetID));
  let selectedRecipe = new Recipe(newRecipeInfo, ingredientsData);

  selectedRecipe.ingredients = selectedRecipe.ingredients.map((element) => {
    let ingredient = new Ingredient(element, ingredientsData)
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

  selectedRecipe.ingredients.forEach(function(element) {
    let currentIngredient = `${element.quantity.amount} ${element.quantity.unit} ${element.uniqueIngredientData.name}`
    selectedRecipeIngredients.push(currentIngredient);
    return selectedRecipeIngredients
  });

  let fullRecipe =
    `<h3 class= "full-recipe"> ${selectedRecipe.name}</h3>
    <img src= "${selectedRecipe.image}" alt="${selectedRecipe.name}"><br>
    <br><b>Ingredients:</b><br>
    <p class= "ingredients">${selectedRecipeIngredients.join(',<br>')}</p>
    <p class= "cost"><b>${selectedRecipe.returnCostEstimation()}<b></p>
    <br><b>Instructions:</b></br>
    <p class= "instructions">${instructions}</p>`;

  recipeDirections.innerHTML = fullRecipe
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

    let buttonClassesFaves = "favorite-star"
    if (currentUser.favoriteRecipes.includes(recipe)){
      buttonClassesFaves = "favorite-star is-favorite"
    }
    let buttonClassesToCook = "recipesToCook"
    if (currentUser.recipesToCook.includes(recipe)){
      buttonClassesToCook = "recipesToCook is-saved"
    }
    allRecipeGrid.innerHTML +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       <button type="favoriteStar" name="favoriteStar" class="${buttonClassesFaves}" id="fave-${recipe.id}">♡</button>
       <button type="recipesToCook" name="recipesToCook" class="${buttonClassesToCook}" id="${recipe.id}">🗓 Cook this week!</button>
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
      let testTags = searchTags.reduce((acc, tag) => {
        if (tagsString.toLowerCase().includes(tag.toLowerCase())){
          acc++;
        }
        return acc;
      }, 0)

      let indexMatchAllSearchTags;
      indexMatchAllSearchTags = (numOfTags===testTags)
      if (indexMatchAllSearchTags){
        returnedArr.push(recipe);
      }

    }, []);
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

function addToLibrary(){
  const recipeRepo = new RecipeRepository(recipeData);
  let saveRecipeBtn;
  let recipeID = event.target.closest('.mini-recipe').id;
  let fullRecipe = recipeRepo.recipeData.find(recipe => recipe.id === Number(recipeID));
  let selectedRecipe = new Recipe(fullRecipe, ingredientsData);
  let index = recipeRepo.recipeData.indexOf(fullRecipe);

  if(event.target.closest('.favorite-star')){
    saveRecipeBtn = event.target.closest('.favorite-star');
    saveRecipeBtn.classList.toggle("is-favorite");
    currentUser.toggleItemInArray('favoriteRecipes', recipeData[index]);
  }
  if(event.target.classList.contains('recipesToCook')){
    saveRecipeBtn = event.target.closest('.recipesToCook')
    currentUser.toggleItemInArray('recipesToCook', recipeData[index]);
    saveRecipeBtn.classList.toggle("is-saved");
  }
}

function generateRandomUser() {
  const randomUser = Math.floor(Math.random() * usersData.length);
  const user = usersData[randomUser];
  let userDataValue = new UserData(user)
  currentUser = userDataValue
};

function generateRandomHomeViewRecipes(){
  show(featuredRecipes);
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
  let randomRecipesIndex = [randomRecipeIndex1, randomRecipeIndex2, randomRecipeIndex3]
  randomRecipesIndex.forEach((randomRecipeIndex) => {

    let index = randomRecipeIndex

   recipeGrid.innerHTML +=
    `<article class="recipe" id=${recipeRepo.recipeData[index].id}>
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
