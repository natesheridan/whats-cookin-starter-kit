
import Ingredient from '../classes/Ingredient';
class Recipe {
    constructor(recipeObj, ingredientsData) {
        this.recipeObj = recipeObj;
        this.id = this.recipeObj.id;
        this.image = this.recipeObj.image;
        this.ingredients = this.recipeObj.ingredients;
        this.instructions = this.recipeObj.instructions;
        this.name = this.recipeObj.name;
        this.tags = this.recipeObj.tags;
        this.isUpdated = false;
        this.ingredientsData = ingredientsData;
    }

    returnIngredients() {
        this.updateIngredientData();
        let returnedIngredients = this.ingredients.map(element => element.name)
        let returnedIngredientQuantity = this.ingredients.map(element => element.quantity.amount + element.quantity.unit)
        return `${returnedIngredients} ${returnedIngredientQuantity}`
    }

    returnCostEstimation(ingredientID = undefined) {
        this.updateIngredientData()
        var totalCostEstimation = 0;
        this.ingredients.forEach(function(element){
            totalCostEstimation = totalCostEstimation + (element.estimatedCostInCents * element.quantity.amount)
        }
        );
        return "$" + (Math.round(totalCostEstimation / 1000));
    }

    returnInstructions() {
        var orderedInstructionsArr = this.instructions.map(element => element.instruction)
        return(orderedInstructionsArr)
    }
    
    updateIngredientData() {
        if (!this.isUpdated) {
            let updatedIngredients = this.ingredients.map(ingredientObj => new Ingredient(ingredientObj, this.ingredientsData))
            this.isUpdated = true;
            this.ingredients = updatedIngredients;
            }
        }
}
export default Recipe;
