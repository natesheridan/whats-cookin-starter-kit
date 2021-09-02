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
  toggleItemInArray(array, recipe){
    switch(array){
      case 'recipesToCook':
        let recipeIndex = this.recipesToCook.indexOf(recipe)
        if(recipeIndex>=0) {// will be > 0 if the element is found in the array
          this.recipesToCook.splice(recipeIndex, 1);  
        } else if (recipeIndex===-1) {//recipeIndex returns -1 if element is not found in the array
          this.recipesToCook.push(recipe)
        }
      case 'favoriteRecipes':
        let recipeIndex = this.favoriteRecipes.indexOf(recipe)
        if(recipeIndex>=0) {
          this.favoriteRecipes.splice(recipeIndex, 1);  
        } else if (recipeIndex===-1) {
          this.favoriteRecipes.push(recipe)
        }
    }    
  }

//Both of these functions in my head should be either the same and/or should be covered by filter methods written before. 
  // Filter my favoriteRecipes by one or more tags.
  // Filter my favoriteRecipes by its name or ingredients.
}




export default UserData
