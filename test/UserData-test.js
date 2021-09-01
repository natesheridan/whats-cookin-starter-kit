import { expect } from 'chai';
import UserData from '../src/classes/UserData';

describe('UserData', () => {
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




});
