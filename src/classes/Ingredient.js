class Ingredient {
    constructor(obj) {
      this.id = obj.id;
      this.uniqueIngredientData;
      this.grabUniqueIngredientData()
      this.name = this.uniqueIngredientData.name;
      this.estimatedCostInCents = this.uniqueIngredientData.estimatedCostInCents
      this.quantity = obj.quantity;
    }
    grabUniqueIngredientData(){
      let self = this;
      let ingredientsData = require('../data/ingredients.js')
      // console.log('ingredientData',ingredientsData);
      let returnedData = ingredientsData.find(({id}) => id === self.id);
      this.uniqueIngredientData = returnedData;
    }

  }
  export default Ingredient;
