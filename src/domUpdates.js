import {currentUser} from './scripts.js'

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
        generateRandomHomeViewRecipes();
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
        //   if(currentUser.recipesToCook.length===0){
        //     allRecipeGrid.innerHTML = `<h1>No recipes found!</h1>`
        //     return
        //   }
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
    
}



export default domUpdates;