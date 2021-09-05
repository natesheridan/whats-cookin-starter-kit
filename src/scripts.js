import styles from './styles.css';
import UserData from './classes/UserData.js';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Ingredient from './classes/Ingredient.js';
import rightArrow from './data/assets/Right-arrow.svg';
import pancakes from './data/assets/pancakes.svg';
import starActive from './data/assets/star-active.svg';
import star from './data/assets/star.svg';
import {usersData} from './data/users.js';
import {recipeData} from './data/recipes.js';

////////////////// GLOBAL VARIABLES //////////////////////////////////
var currentUser;
////////////////// QUERY SELECTORS ///////////////////////////////////
const allRecipeGrid = document.querySelector('#allRecipeGrid');
const mainContent = document.querySelector('#mainContent');
const allRecipes = document.querySelector('#allRecipesButton');
const recipeGrid = document.querySelector('#recipeGrid');
const contentContainer = document.querySelector('.content-container');
const searchSubmitBtn = document.querySelector('.search-submit-btn');
const searchFieldInput = document.querySelector('.search-field');
const recipeFormTitle = document.querySelector('#recipeFormTitle');
const recipeFormImage = document.querySelector('#recipeFormImage');
const recipeFormIngredient = document.querySelector('#recipeFormIngredient');
const unitSelection = document.querySelector('#unitSelection');
////////////////// BUTTONS & FORMS ///////////////////////////////////
const ingredientAmount = document.querySelector('#ingredientAmount');
const homeButton = document.querySelector('#homeButton');
const savedRecipesButton = document.querySelector('#savedRecipesButton');
const addRecipeButton = document.querySelector('#addRecipeButton');
const addRecipeForm = document.querySelector('#addRecipeForm');
const loginPopup = document.querySelector('#loginPopup');
const loginButton = document.querySelector('#loginButton');
const plusButton = document.querySelector('#plusButtonContainer');
const homeFavoriteStar1 = document.querySelector('#favoriteStar1')
const homeFavoriteStar2 = document.querySelector('#favoriteStar2')
const homeFavoriteStar3 = document.querySelector('#favoriteStar3')
const submitRecipeButton = document.querySelector('#submitRecipe');
const addIngredientButton = document.querySelector('#plusButtonContainer');

////////////////////// FILTER CHECKBOXES && SEARCH ARRAY /////////////////////
const filters = document.querySelector('#filters');
const searchFavesInput = document.querySelector('#searchFavesByName');
const searchFavesBtn = document.querySelector('#searchFavesSubmitBtn');
let filterSelection = [];
let addedIngredients = [];

/////////////////////// EVENT LISTENERS ////////////////////////////////////////
searchSubmitBtn.addEventListener('click', searchByName);
allRecipes.addEventListener('click', viewAllRecipes);
contentContainer.addEventListener('click', getDirections);
homeFavoriteStar1.addEventListener('click', ()=>{selectFavoriteRecipe(1)});
homeFavoriteStar2.addEventListener('click', ()=>{selectFavoriteRecipe(2)});
homeFavoriteStar3.addEventListener('click', ()=>{selectFavoriteRecipe(3)});
homeButton.addEventListener('click', showHomeView);
addRecipeButton.addEventListener('click', showRecipeForm);
loginButton.addEventListener('click', showLogin);
savedRecipesButton.addEventListener('click', function(){populateCards(currentUser.favoriteRecipes)});
filters.addEventListener('click', filterRecipes);
plusButton.addEventListener('click', addIngredient);
submitRecipeButton.addEventListener('click', addNewRecipe);
addIngredientButton.addEventListener('click', addIngredient);
searchFavesBtn.addEventListener('click', searchRecipes);

//////////////////// FUNCTIONS ///////////////////////////////////////

function filterRecipes() {
  if (event.target.value) {
    filterSelection.push(event.target.value);
    console.log(filterSelection);
    searchByTag(recipeData, filterSelection);
  }
};

function addIngredient() {
  let ingredient = recipeFormIngredient.value;
  let unit = unitSelection.value;
  let unitCount = ingredientAmount.value;
  addedIngredients.push(`${ingredient}: ${unitCount} ${unit}`);
  recipeFormIngredient.value = null;
  unitSelection.value = null;
  ingredientAmount.value = null;
};

function generateRandomNumber() {
  return Math.floor(Math.random()*90000) + 10000;
};

function addNewRecipe() {
  let titleField = recipeFormTitle.value;
  let imageField = recipeFormImage.value;
  let ingredients = recipeFormIngredient.value;
  let unitField = unitSelection.value;
  addIngredient();
  let newRecipe = new Recipe({id: generateRandomNumber(), name: titleField, image: imageField, ingredients: [addedIngredients]});
  recipeData.push(newRecipe);
  addedIngredients = [];
};

function viewAllRecipes() {
  hide(recipeGrid);
  hide(addRecipeForm);
  show(allRecipeGrid);
  hide(searchFavesInput);
  hide(searchFavesBtn);

  let recipeRepo = new RecipeRepository(recipeData);
  allRecipeGrid.innerHTML = ""
  const viewAllRecipes = recipeRepo.recipeData.reduce((acc, recipe) => {
    let buttonClasses = "favorite-star"
    let idMap = currentUser.favoriteRecipes.map((faveItem) => faveItem.id)
    console.log(idMap)
    console.log(recipe.id)
    if (idMap.includes(recipe.id)){
      buttonClasses = "favorite-star is-favorite"
    }
    allRecipeGrid.innerHTML +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       <button type="favoriteStar" name="favoriteStar" class="${buttonClasses}" id="faveBtn-${recipe.id}"></button>
       </article>`

      return acc;
    }, []);
    return viewAllRecipes;
};

function showHomeView() {
  show(recipeGrid);
  hide(addRecipeForm);
  hide(allRecipeGrid);
  hide(searchFavesInput);
  hide(searchFavesBtn);
};

function showRecipeForm() {
  show(addRecipeForm);
  hide(recipeGrid);
  hide(allRecipeGrid);
};

function showLogin() {
  loginPopup.classList.toggle('hidden');
};


function getDirections(event){
  if(event.target.classList.contains('favorite-star')){
    addToFavorites();
    return
  };

  allRecipeGrid.innerHTML = "";
  let targetID = event.target.closest('.mini-recipe').id;
  let newRecipeInfo = recipeData.find(recipe => recipe.id === Number(targetID));
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
    popupMessage("Please enter a search term!", 1000, "red")
    return
  };
  let recipeRepo = new RecipeRepository(recipeData);
  let filteredRecipes = recipeRepo.filterByName(searchFieldInput.value)
  if (filteredRecipes.length === 0){

    popupMessage("No results found! Sorry!", 1000, "red")
    return
  };
  populateCards(filteredRecipes)
};

function displaySavedRecipes() {
  populateCards(currentUser.favoriteRecipes)
};

function populateCards(arr){
  show(allRecipeGrid);
  hide(recipeGrid);
  show(searchFavesInput);
  show(searchFavesBtn);
  let recipeRepo = new RecipeRepository(recipeData);
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
       <button type="favoriteStar" name="favoriteStar" class="${buttonClasses}" id="fave-${recipe.id}"></button>
       </article>`

      return acc;
    }, []);
};

// function searchFaves(){
//   /*an array of all tags
//   if allTagsArray.includes(searchInput) then execute the tags function
//   else search for the names
//   */
//   let searchInput = searchFavesInput.value;
//   let searchedData = currentUser.favoriteRecipes.filter(recipe => recipe['name'].includes(searchInput));
//
//   return searchedData
// };
//
// function searchFavesByTag(){
//   let searchedData = currentUser.favoriteRecipes.filter(recipe => recipe['tags'].includes(searchInput));
// };

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
    console.log('searchedData: ', searchedData)
  return searchedData
};

function setUserData(){
  let user = new UserData()
};

function joinToString(array){
  return array.join(" ")
};

function searchByTag(recipesArray, searchTags){
  let indexMatchAllStrings
  let returnedArr = []
  let filteredArray = recipesArray.reduce((acc, recipe) => {
      let tagsString = joinToString(recipe.tags);
      let numOfTags = searchTags.length;
      let testTags = searchTags.reduce((acc, tag) => {
        if (tagsString.includes(tag)){
          acc++;
        }
        return acc;
      }, 0)
      console.log(testTags===numOfTags)
      indexMatchAllSearchTags = (numOfTags===testTags)
      if (indexMatchAllSearchTags){
        returnedArr.push(recipe);
      }

    }, []);
  return returnedArr;
};

function hide(element){
  element.classList.add('hidden');
};

function show(element){
  element.classList.remove('hidden')
};

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

generateRandomUser()
