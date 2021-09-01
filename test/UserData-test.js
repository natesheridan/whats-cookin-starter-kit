import { expect } from 'chai';
import UserData from '../src/classes/UserData';

describe('UserData', () => {
  const recipeData = [
    {
    id: 595736,
    image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
    ingredients: [
      {
        id: 20081,
        quantity: {
          amount: 1.5,
          unit: 'c'
        }
      },
      {
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        }
      },
    ],
    instructions: [
      {
        instruction: 'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        number: 1
      },
      {
        instruction: 'Add egg and vanilla and mix until combined.',
        number: 2
      },
    ],
    name: 'Loaded Chocolate Chip Pudding Cookie Cups',
    tags:[
      'antipasti',
      'starter',
      'snack',
      'appetizer',
      'lunch'
    ]
  },
  {
    id: 412309,
    image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
    ingredients: [
      {
        id: 1002030,
        quantity: {
          amount: 4,
          unit: 'teaspoons'
        }
      },
      {
        id: 19334,
        quantity: {
          amount: 8,
          unit: 'tablespoons'
        }
      },
    ],
    instructions: [
      {
        instruction: 'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
        number: 1
      },
    ],
    name: 'Dirty Steve\s Original Wing Sauce',
    tags:[
      'sauce',
    ]
  },
  {
    id: 741603,
    image: 'https://spoonacular.com/recipeImages/741603-556x370.jpeg',
    ingredients: [
      {
        id: 20081,
        quantity: {
          amount: 1,
          unit: 'cup'
        }
      },
      {
        id: 18371,
        quantity: {
          amount: 2,
          unit: 'teaspoons'
        }
      },
    ],
    instructions: [
      {
        instruction: 'Watch how to make this recipe.',
        number: 1
      },
      {instructions: 'In a large bowl, whisk together buttermilk, eggs, baking powder, sugar, salt and butter.',
      number: 2
      }
    ],
    name: 'Elvis Chocolate Pancakes',
    tags:[
      'side dish',
      'snack',
    ]
  }
  ];
  it('Should be a function', () => {
    const user1 = new UserData()
    expect(UserData).to.be.a('function');
  });

  it('Should contain a username', () => {
    const user1 = new UserData('Nate')
    expect(user1.username).to.equal('Nate');
  })

  it('Should have an array of favorite recipes', () => {
    const user1 = new UserData()
    expect(user1.favoriteRecipes).to.deep.equal([]);
  });

  it('Should have an array of recipes to cook', () => {
    const user1 = new UserData()
    expect(user1.recipesToCook).to.deep.equal([]);
  });

  it('Should be able to save a favorite recipe', () => {
    const user1 = new UserData();
    user1.favoriteThisRecipe('Elvis Chocolate Pancakes');
    user1.favoriteThisRecipe('Loaded Chocolate Chip Pudding Cookie Cups')
    expect(user1.favoriteRecipes).to.deep.equal([recipeData[1], recipeData[2]]);
  });




});
