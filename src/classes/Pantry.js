//We want a Pantry class that contains userIngredients, that can be measured to see if we have enough of all given ingredients to
//cook a given recipe, and updated to reflect additions or subtractions to user stockpile based on recipes cooked or what user has acquired

class Pantry {
  constructor(userIngredients) {
  this.pantry = userIngredients;
  }


  confirmNeededIngredients(recipe) {
    //We want to check the recipe ingredients object against pantry data to confirm that pantry contains all necessary ingredients in sufficient amount to complete recipe. Therefore method must accurately grab recipe ingredient and ingredient amount data and compare them to corresponding data points in pantry, under the conditional that if pantry values are greater than recipe requirement values user may proceed to cook recipe.
  }
};
export default Pantry;
