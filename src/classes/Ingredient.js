class Ingredient {
  constructor(obj, ingredientsData) {
    this.id = obj.id || obj.ingredient;
    this.quantity = obj.quantity || obj.amount;
    this.ingredientsData = ingredientsData;
    this.grabUniqueIngredientData()
    this.name;
    this.estimatedCostInCents;

  }
  grabUniqueIngredientData(){
    let self = this;
    let returnedData = this.ingredientsData.find(({id}) => id === self.id);
    if (!returnedData){
      let errMessage = "No Ingredient Data Found"
      this.uniqueIngredientData = errMessage;
      this.name = errMessage;
      this.estimatedCostInCents = errMessage;
      return
    }
    this.uniqueIngredientData = returnedData;
    this.name = this.uniqueIngredientData.name;
    this.estimatedCostInCents = this.uniqueIngredientData.estimatedCostInCents
  }
}
export default Ingredient
