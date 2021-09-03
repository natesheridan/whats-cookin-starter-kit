import styles from './styles.css';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Ingredient from './classes/Ingredient.js';
import rightArrow from './data/assets/Right-arrow.svg';
import pancakes from './data/assets/pancakes.svg';
import starActive from './data/assets/star-active.svg';
import star from './data/assets/star.svg';
import {userData} from './data/users.js';
import {recipeData} from './data/recipes.js';


const allRecipeGrid = document.querySelector('#allRecipeGrid');
const mainContent = document.querySelector('#mainContent');
const allRecipes = document.querySelector('#allRecipesButton');
const recipeGrid = document.querySelector('#recipeGrid');
const contentContainer = document.querySelector('.content-container');
const searchSubmitBtn = document.querySelector('.search-submit-btn');
const searchFieldInput = document.querySelector('#searchField');



searchSubmitBtn.addEventListener('click', searchByName);
allRecipes.addEventListener('click', viewAllRecipes);
contentContainer.addEventListener('click', getDirections);

function viewAllRecipes() {
  show(allRecipeGrid);
  hide(recipeGrid);

  const recipeRepo = new RecipeRepository(recipeData);
  const recipeCard = recipeRepo.recipeData.reduce((acc, recipe) => {
    acc +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       </article>`

    return acc;
  }, []);
  return allRecipeGrid.innerHTML = recipeCard
};

function getDirections(event){
  allRecipeGrid.classList.add('hidden');
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
    <p class= "instructions">${instructions}</p>`

  return contentContainer.innerHTML = fullRecipe

};


function searchByName(){
  let recipeRepo = new RecipeRepository(recipeData);
  let filteredRecipes = recipeRepo.filterByName(searchFieldInput.value)
  show(allRecipeGrid);
  hide(recipeGrid);

  const recipeCard = filteredRecipes.reduce((acc, recipe) => {
    acc +=
      `<article class="mini-recipe" id="${recipe.id}">
       <img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>
       </article>`

    return acc;
  }, []);
  return allRecipeGrid.innerHTML = recipeCard

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
function hide(element){
  element.classList.add('hidden')
}
function show(element){
  element.classList.remove('hidden')
}


// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by multiple tags.
// As a user, I should be able to search recipes by their name or ingredients.
