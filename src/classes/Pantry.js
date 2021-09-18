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
    recipe.updateIngredientData();

    if(confirmation === 'true') {
      console.log('test TRUE')
      return 'You have enough ingedients in the pantry to cook this recipe!'
    } else {
      let neededIngredients = recipe.ingredients.reduce((acc, recipeIngredient) => {
        let userFeedback = '';
        let userPantry = this.pantry.forEach((pantryItem) => {
          if(pantryItem.amount < recipeIngredient.quantity.amount && pantryItem.ingredient === recipeIngredient.id ) {
            let amount = recipeIngredient.quantity.amount - pantryItem.amount
            let units = recipeIngredient.quantity.unit
            let ingredientID = recipeIngredient.id
            userFeedback = `You need ${amount} more ${units} of ${recipeIngredient.name}`
          }
        })
        acc = userFeedback
        return acc
      }, '')

      console.log(neededIngredients)
      return neededIngredients
    }
  }
};
export default Pantry;
