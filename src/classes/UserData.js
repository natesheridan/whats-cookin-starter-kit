class UserData {
  constructor(user){
    this.username = user.username;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleFavoriteRecipe(recipe){
    let query = this.favoriteRecipes.find((element, index) => {
      let match = element === recipe;
      return [match, index]
    });

    if(!query[0]) {
      this.favoriteRecipes.push(recipe);
    } else {
      this.favoriteRecipes.splice(query[1], 1);
    }

  }

};




export default UserData
