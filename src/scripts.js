import styles from './styles.css';
import Recipe from './classes/Recipe.js';
import RecipeRepository from './classes/RecipeRepository.js';
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

allRecipes.addEventListener('click', viewAllRecipes);
//
// As a user, I should be able to view a list of all recipes.
//populate recipe grid with all recipes
//need recipeRepo to hold an array of recipes
function viewAllRecipes() {
  allRecipeGrid.classList.remove('hidden');
  recipeGrid.classList.add('hidden');

  const recipeRepo = new RecipeRepository(recipeData);
/*images are populating, but cannot get the correct section to hide*/
  const recipeCard = recipeRepo.recipeData.reduce((acc, recipe) => {
    acc +=
      `<img src= "${recipe.image}" alt= "${recipe.name}">
       <p>${recipe.name}</p>`

    console.log(acc);
    return acc;
  }, []);
  return allRecipeGrid.innerHTML = recipeCard
}


function searchData(input) {
  let searchedData = recipeData.filter(recipe => recipe[`${input}`].includes(searchBar.input));
};

function setUserData(){
  let user = new UserData()
// if the user login matches the user.name....
//...then the app populates with that user's info
};

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by multiple tags.
// As a user, I should be able to search recipes by their name or ingredients.
