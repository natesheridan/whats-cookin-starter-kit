import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import UserData from '../src/classes/UserData';
import Ingredient from '../src/classes/Ingredient';
import Recipe from '../src/classes/Recipe';
import ingredientData from '../src/data/ingredients';

let userA;
let userB;
let recipe1;
let recipeToCook;
let userPantry1;
let userPantry2;

describe('UserData', () => {
  beforeEach(() => {
    userA = {
      name: 'Nate',
      id: 1,
      pantry: [
        {
          "ingredient": 11297,
          "amount": 4
        },
        {
          "ingredient": 10020005,
          "amount": 1
        },
        {
          "ingredient": 20081,
          "amount": 5
        },
      ]
    }
  userB = {
    name: 'Josh',
    id: 2,
    pantry: [
      {
        "ingredient": 4025,
        "amount": 1
      },
      {
        "ingredient": 10020005,
        "amount": 10
      },
      {
        "ingredient": 1041009,
        "amount": 5
      },
    ]
  }
  recipe1 = {
  "id": 111,
  "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
  "ingredients":
    [
      {
      "id": 4025,
      "quantity": { //mayo
        "amount": 1,
        "unit": "cups"
        }
      },{
      "id": 10020005,
      "quantity": {
        "amount": 2, //farro
        "unit": "units"
        }
      },{
      "id": 1041009,
      "quantity": {
        "amount": 3, //cheese
        "unit": "tsp"
        }
      },
    ],
  "instructions":
    [
      {
      "instruction": "1-INSTRUCTION1",
      "number": 1
      },{
      "instruction": "1-INSTRUCTION2",
      "number": 2
      },{
      "instruction": "1-INSTRUCTION3",
      "number": 3
      }
    ],
  "name": "TEST RECIPE 1",
  "tags":
    [
    "1antipasto",
    "1hor d'oeuvre"
    ]
  };

  recipeToCook = new Recipe(recipe1, ingredientData);
  userPantry1 = new Pantry(userA.pantry);
  userPantry2 = new Pantry(userB.pantry);
});

it('Should be a function', () => {
  expect(Pantry).to.be.a('function');
});

it('Should contain userIngredients', () => {
  expect(userPantry1.pantry).to.equal(userA.pantry);
  expect(userPantry2.pantry).to.equal(userB.pantry);
});

it('Should tell you if your pantry has enough for a recipe', () => {
    expect(userPantry1.confirmNeededIngredients(recipeToCook)).to.equal('false');
    expect(userPantry2.confirmNeededIngredients(recipeToCook)).to.equal('true');
  });

it('Should calculate the amount in a recipe that I need in my pantry', () => {
    expect(userPantry2.calculateIngredientsNeeded(recipeToCook)).to.equal('You have enough ingedients in the pantry to cook this recipe!');
    expect(userPantry1.calculateIngredientsNeeded(recipeToCook)).to.equal('You need 1 more units of farro');
  });
});
