class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData || [];
  }
  filterByTag(tagName){
    const filteredRecipes = this.recipeData.filter((recipe) => {
      return recipe.tags.toLowerCase().indexOf(tagName.toLowerCase())
    })
    return filteredRecipes;
  }
  filterByName(recipeName){
    const filteredRecipes = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(recipeName.toLowerCase())
    })
    return filteredRecipes;
  }
}
export default RecipeRepository;