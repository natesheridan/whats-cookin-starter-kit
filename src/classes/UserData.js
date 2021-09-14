class UserData {
  constructor(user){
    this.username = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleItemInArray(array, recipe){
    if(array === 'recipesToCook'){
      let recipeIndices = this.recipesToCook.indexOf(recipe)
      if(recipeIndices>=0) {
        this.recipesToCook.splice(recipeIndices, 1);
      } else if (recipeIndices===-1) {
        this.recipesToCook.push(recipe)
      }
    }
    if(array === 'favoriteRecipes'){
      let recipeIndices = this.favoriteRecipes.indexOf(recipe);
      if(recipeIndices>=0) {
        this.favoriteRecipes.splice(recipeIndices, 1);
      } else if (recipeIndices===-1) {
        this.favoriteRecipes.push(recipe)
      }
    }
  }
}





export default UserData
