class UserData {
  constructor(user){
    this.username = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  // Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes / recipesToCook)
  // USECASE:
  // to add recipe to an array: (UserDataVariable).toggleItemInArray(<'recipesToCook'/'favoriteRecipes'>, recipeObject)
  // to remove: repeat same invocation
  toggleItemInArray(array, recipe){
    if(array === 'recipesToCook'){
        let recipeIndices = this.recipesToCook.indexOf(recipe)
        if(recipeIndices>=0) {// will be > 0 if the element is found in the array
          this.recipesToCook.splice(recipeIndices, 1);
        } else if (recipeIndices===-1) {//recipeIndex returns -1 if element is not found in the array
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
//Both of these functions in my head should be either the same and/or should be covered by filter methods written before.
  // Filter my favoriteRecipes by one or more tags.
  // Filter my favoriteRecipes by its name or ingredients.





export default UserData
