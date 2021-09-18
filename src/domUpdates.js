import {currentUser} from './scripts.js'
import RecipeRepository from './classes/RecipeRepository.js';
import {recipeData} from './scripts.js'

let domUpdates = {
    hide(element){
        element.classList.add('hidden')
    },
    show(element){
        element.classList.remove('hidden')
    },
    showRecipesToCook() {
        domUpdates.hide(recipeDirectionsContainer);
        domUpdates.populateCards(currentUser.recipesToCook);
        domUpdates.show(featuredRecipes);
        domUpdates.show(allRecipeGrid);
        if(currentUser.recipesToCook.length===0){
          allRecipeGrid.innerHTML = `<h1>No recipes found!</h1>`
          return
        }
        featuredRecipes.innerHTML = `<h1>Recipes</h1>`
    },
    viewAllRecipes() {
        domUpdates.show(filters);
        domUpdates.show(allRecipeContainer);
        domUpdates.hide(addRecipeForm);
        domUpdates.hide(recipeGrid);
        domUpdates.hide(recipeDirectionsContainer);
        domUpdates.show(allRecipeGrid);
        domUpdates.hide(searchFavesInput);
        domUpdates.hide(searchFavesSubmitBtn);
        domUpdates.show(featuredRecipes);
        featuredRecipes.innerHTML = `<h1>All Recipes</h1>`;

        let recipeRepo = new RecipeRepository(recipeData);
        domUpdates.populateCards(recipeRepo.recipeData)
    },
    showHomeView() {
        domUpdates.show(recipeGrid);
        scripts.generateRandomHomeViewRecipes();
        domUpdates.hide(addRecipeForm);
        domUpdates.hide(allRecipeContainer);
        domUpdates.hide(allRecipeGrid);
        domUpdates.hide(recipeDirectionsContainer);
        domUpdates.show(mainContent);
        domUpdates.hide(searchFavesSubmitBtn);
        domUpdates.hide(searchFavesByName);
        domUpdates.hide(filters);
        domUpdates.show(featuredRecipes);
        featuredRecipes.innerHTML = `<h1>Featured Recipes</h1>`;
    },
    populateCards(arr){
        this.show(allRecipeGrid);
        this.hide(recipeGrid);
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
      },

      popupMessage(message, timeInMS, color = "gold") {
        let popupContainer = document.querySelector('#popup')
        popupContainer.classList.add(`${color}-popup`)
        popupContainer.innerHTML=`<p>${message}</p>`
        domUpdates.show(popupContainer)

        setTimeout(function() {
            popupContainer.classList.remove(`${color}-popup`)
            domUpdates.hide(popupContainer);
        }, timeInMS)
},

  displayEmptyFavorites() {
    featuredRecipes.innerHTML = `<h1>Add a Recipe</h1>`;
},

displaySavedRecipes() {
  if(currentUser.favoriteRecipes.length===0){
    allRecipeGrid.innerHTML = `<h1>No recipes found!</h1>`
    return
  }
  featuredRecipes.innerHTML = `<h1>Saved Recipes</h1>`;
},

generateRandomHomeViewRecipes(){
domUpdates.show(featuredRecipes);
let recipeRepo = new RecipeRepository(recipeData);
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
},

}



export default domUpdates;
