// const ingredientsData = require('../data/ingredients')




class Ingredient {
  constructor(obj, ingredientsData) {
    this.id = obj.id;
    this.quantity = obj.quantity;
    this.ingredientsData = ingredientsData;
    this.grabUniqueIngredientData()
    this.name;
    this.estimatedCostInCents;
    
  }
  grabUniqueIngredientData(){
    let self = this;
    console.log(this.ingredientsData)
    let returnedData = this.ingredientsData.find(({id}) => id === self.id);
    this.uniqueIngredientData = returnedData;
    this.name = this.uniqueIngredientData.name;
    this.estimatedCostInCents = this.uniqueIngredientData.estimatedCostInCents
  }
}
export default Ingredient
