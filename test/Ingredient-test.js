import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientData from '../src/data/ingredients'

let testRecipeIngredients = [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 12345,
          "quantity": {
            "amount": 3,
            "unit": "Tbsp"
          }
        }
      ]

let testIngredient;
let testIngredient1;
let testIngredient2;
describe('Ingredient Test', () => {
    beforeEach(() => {
        testIngredient = new Ingredient(testRecipeIngredients[0], ingredientData)
        testIngredient1 = new Ingredient(testRecipeIngredients[1], ingredientData)
        testIngredient2 = new Ingredient(testRecipeIngredients[2], ingredientData)
    });
    it('It should be given raw ingredient data with no name', () => {
        expect(testRecipeIngredients[0].id).to.deep.equal(20081)
        expect(testRecipeIngredients[0].name).to.equal(undefined)
        expect(testIngredient.id).to.deep.equal(20081)
    })
    it('Store ingredients data and be inputed as a parameter', () => {
        let testIng = new Ingredient({"id":123}, [{"id": 123, "name":"test"}])
        expect(testIng.ingredientsData).to.have.a.lengthOf(1)
        expect(testIng.ingredientsData[0].id).to.deep.equal(123)
        expect(testIng.name).to.deep.equal("test")
    })
    it('Should have a name after instanciation based off of the ID', () => {
        expect(testIngredient.name).to.deep.equal("wheat flour")
        expect(testIngredient1.name).to.deep.equal("bicarbonate of soda")
        expect(testIngredient2.name).to.not.equal("wheat flour")
    })
    it('Should return an unknown name recipe if the ID is not found', () => {
        let testIngredient3 = new Ingredient(testRecipeIngredients[4], ingredientData)
        expect(testIngredient3.name).to.deep.equal('No Ingredient Data Found')
        expect(testIngredient3.estimatedCostInCents).to.deep.equal('No Ingredient Data Found')
        expect(testIngredient3.name).to.deep.equal('No Ingredient Data Found')
    })
})