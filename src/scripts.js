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

// BUTTONS & SECTIONS //

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
const unitSelection = document.querySelector('#unitSelection')


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
var currentUser;
// const submitRecipeButton = document.querySelector('#submitRecipe');

// FILTER CHECKBOXES && SEARCH ARRAY //

const filters = document.querySelector('#filters');
let filterSelection = [];

// EVENT LISTENERS //

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
// plusButton.addEventListener('click', addIngredient);
// submitRecipeButton.addEventListener('click', addNewRecipe);

// MAIN FUNCTIONS //

function filterRecipes() {
  // event.preventDefault();
  if (event.target.value) {
    filterSelection.push(event.target.value);
    console.log(filterSelection);
    searchByTag(recipeData, filterSelection);
  }
}

function addIngredient() {
  console.log('Nice');
}

function viewAllRecipes() {

  const recipeRepo = new RecipeRepository(recipeData);
  populateCards(recipeRepo.recipeData);
};

function showHomeView() {

  show(recipeGrid);
  hide(addRecipeForm);
  hide(allRecipeGrid);
}

function showRecipeForm() {
  show(addRecipeForm);
  hide(recipeGrid);
  hide(allRecipeGrid);
}

function showLogin() {
  loginPopup.classList.toggle('hidden');
}

function addNewRecipe() {
  let titleField = recipeFormTitle.value;
  console.log(titleField);
  let imageField = recipeFormImage.value;
  console.log(imageField);
  let ingredients = recipeFormIngredient.value;
  console.log(ingredients);
  let unitField = unitSelection.value;
  console.log(unitField);
}

function getDirections(targetID){
  // allRecipeGrid.classList.add('hidden');

  // let targetID = event.target.closest('.mini-recipe').id;
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
    <p class= "instructions">${instructions}</p>`


  return contentContainer.innerHTML = fullRecipe

};


function searchByName(){
  if(searchFieldInput.value ===""){
    popupMessage("Please enter a search term!", 1000, "red")
    return
  }
  let recipeRepo = new RecipeRepository(recipeData);
  let filteredRecipes = recipeRepo.filterByName(searchFieldInput.value)
  if (filteredRecipes.length === 0){

    popupMessage("No results found! Sorry!", 1000, "red")
    return
  }
  populateCards(filteredRecipes)

}

function populateCards(arr){
  show(allRecipeGrid);
  hide(recipeGrid);
  let recipeRepo = new RecipeRepository(recipeData);
  allRecipeGrid.innerHTML = ""
  const recipeCard = arr.reduce((acc, recipe) => {
    allRecipeGrid.innerHTML +=
      `<article class="mini-recipe" id="card-${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       <button type="favoriteStar" name="favoriteStar" class="favorite-star" id="faveBtn-${recipe.id}"></button>
       </article>`

      let recipeIndex = recipeRepo.recipeData.indexOf(recipe)
      let eachCard =  document.querySelector(`#card-${recipe.id}`)
      eachCard.addEventListener("click", ()=> getDirections(Number(recipe.id)))
      let eachButton = document.querySelector(`#faveBtn-${recipe.id}`)
      eachButton.addEventListener("click", ()=>{selectFavoriteRecipe(recipeIndex)})
      return acc;
    }, []);
    console.log(currentUser)
  


}

function searchData(input) {
  let searchedData = recipeData.filter(recipe => recipe[`${input}`].includes(searchFieldInput.value));
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
}


function selectFavoriteRecipe(index) {
  currentUser.toggleItemInArray('favoriteRecipes', recipeData[index]);
  console.log(currentUser.favoriteRecipes);
};



function generateRandomUser() {
  const randomUser = Math.floor(Math.random() * usersData.length);
  const user = usersData[randomUser];
  let userDataValue = new UserData(user)
  currentUser = userDataValue
  console.log(currentUser)

}
generateRandomUser();
