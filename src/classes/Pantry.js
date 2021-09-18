class Pantry {
  constructor(userIngredients) {
  this.pantry = userIngredients;
  }

  confirmNeededIngredients(recipe) {
    let confirmation = 'false';
    console.log(confirmation)
    let recipeInfo = recipe.ingredients.forEach((ingredientInfo) => {
      let userPantry = this.pantry.forEach((item) => {
        if(item.ingredient === ingredientInfo.id && item.amount >= ingredientInfo.quantity.amount) {
          confirmation = 'true';
        } else if(!recipe.ingredients.includes(item)) {
          confirmation = 'false';
        }
      })
    })
    return confirmation;
  }

  calculateIngredientsNeeded(recipe) {
    let confirmation = this.confirmNeededIngredients(recipe);
    recipe.updateIngredientData();

    if(confirmation === 'true') {
      return 'You have enough ingedients in the pantry to cook this recipe!'
    } else {
      let neededIngredients = recipe.ingredients.reduce((acc, recipeIngredient) => {
        let userPantry = this.pantry.forEach((pantryItem) => {
          let amount = recipeIngredient.quantity.amount - pantryItem.amount
          let units = recipeIngredient.quantity.unit
          let ingredientID = recipeIngredient.id
          if(pantryItem.amount < recipeIngredient.quantity.amount && pantryItem.ingredient === recipeIngredient.id ) {
            acc += `You need ${amount} more ${units} of ${recipeIngredient.name}`
          }
        })
        return acc
      }, '')
      console.log(neededIngredients)
      return neededIngredients
    }
  }
};
export default Pantry;
