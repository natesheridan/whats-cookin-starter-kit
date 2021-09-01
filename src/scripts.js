import Recipe from './Recipe.js';
import RecipeRepository from 'src/classes/RecipeRepository.js';
import recipeData from 'src/data/recipes.js'
const allRecipeGrid = document.querySelector('#allRecipeGrid');
const mainContent = document.querySelector('#mainContent');
const allRecipes = document.querySelector('#allRecipes');

allRecipes.addEventListener('click', viewAllRecipes);

function viewAllRecipes() {
  console.log("test");
  allRecipeGrid.classList.remove('hidden');
  mainContent.classList.add('hidden');
  const recipeRepo = new RecipeRepository(recipeData);
  const recipeCard = recipeRepo.recipeData.reduce((acc, recipe) => {
    acc = {
      image: `${recipe.image}`,
      name: `${recipe.name}`
    }
    return acc;
  }, []);
  allRecipeGrid.innerHTML = `${recipeCard}`
}

function searchData(input) {
  let searchedData = recipeData.filter(recipe => recipe[`${input}`].includes(searchBar.input));
};


// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by multiple tags.
// As a user, I should be able to search recipes by their name or ingredients.
