class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData || [];
  }
  
  filterByName(recipeName){
    let filteredRecipes = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(recipeName.toLowerCase())
    })
    return filteredRecipes;
  }
}
export default RecipeRepository;
