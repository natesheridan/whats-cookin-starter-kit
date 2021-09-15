import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import UserData from '../src/classes/UserData';
import Ingredient from '../src/classes/Ingredient';

let userA;

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
          "ingredient": 1082047,
          "amount": 10
        },
        {
          "ingredient": 20081,
          "amount": 5
        },
      ]
    }
  };

it('Should be a function', () => {
  expect(Pantry).to.be.a('function');
});

it('Should contain userIngredients', () => {
  expect(userA.pantry).to.equal(this.pantry);
});

it('Should tell you if your pantry has enough for a recipe', () => {
    expect(insertcodehere).to.equal(insertcodehere);
  });

it('Should calculate the amount in a recipe that I need in my pantry', () => {
    expect(insertcodehere).to.equal(insertcodehere);
  });
}
