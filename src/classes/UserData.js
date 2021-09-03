class UserData {
  constructor(user){
    this.username = user.username;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  // Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes / recipesToCook)
  // USECASE:
  // to add recipe to an array: (UserDataVariable).toggleItemInArray(<'recipesToCook'/'favoriteRecipes'>, recipeObject)
  // to remove: repeat same invocation
  toggleItemInArray(array, recipeID){
    if(array === 'recipestoCook'){
        let recipeIndex = this.recipesToCook.map(function(e){return e.id}).indexOf(recipeID)
        if(recipeIndex>=0) {// will be > 0 if the element is found in the array
          this.recipesToCook.splice(recipeIndex, 1);
        } else if (recipeIndex===-1) {//recipeIndex returns -1 if element is not found in the array
          this.recipesToCook.push(recipeID)
        }
      }
    if(array === 'favoriteRecipes'){
        let recipeIndices = this.favoriteRecipes.map(function(e){return e.id}).indexOf(recipeID);
        console.log(recipeIndices);
        if(recipeIndices>=0) {
          this.favoriteRecipes.splice(recipeIndices, 1);
        } else if (recipeIndices===-1) {
          this.favoriteRecipes.push(recipeID)
        }
    }
  }
}
//Both of these functions in my head should be either the same and/or should be covered by filter methods written before.
  // Filter my favoriteRecipes by one or more tags.
  // Filter my favoriteRecipes by its name or ingredients.





export default UserData
