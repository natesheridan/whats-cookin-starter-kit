class Pantry {
  constructor(userIngredients) {
  this.pantry = userIngredients;
  }

  confirmNeededIngredients(recipe) {
    let confirmation = 'false';

    let recipeInfo = recipe.ingredients.forEach((ingredientInfo) => {
      let userPantry = this.pantry.forEach((item) => {
        if(item.ingredient === ingredientInfo.id && item.amount >= ingredientInfo.quantity.amount) {
          confirmation = 'true';
        }
      })
    })
    return confirmation;
  }

  calculateIngredientsNeeded(recipe) {
    let confirmation = this.confirmNeededIngredients(recipe);
  
    if(confirmation === 'true') {
      return 'You have enough ingedients in the pantry to cook this recipe!'
    } else {
      let neededIngredients = recipe.ingredients.reduce((acc, recipeIngredient) => {
        let userPantry = this.pantry.forEach((pantryItem) => {
          if(pantryItem.amount < recipeIngredient.quantity.amount && pantryItem.ingredient === recipeIngredient.id ) {
            let amount = recipeIngredient.quantity.amount - pantryItem.amount
            let units = recipeIngredient.quantity.unit
            let ingredientID = recipeIngredient.id
            acc += `You need ${amount} more ${units} of ${ingredientID}`
          }
        })
        return acc
      }, '')
      return neededIngredients
    }
  }
};
export default Pantry;
