// https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users

// https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients

// https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes

let usersData = [];
let ingredientsData = [];
let recipeData = [];


export function fetchUsersData() {
    fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => usersData.push(data))
    // .then(data => console.log(data))
    // .then(data => console.log('USERSDATA: ', usersData))
    return usersData;
}
export function fetchIngredientsData() {
  fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
  .then(response => response.json())
  .then(data => ingredientsData.push(data))
  // .then(data => console.log('INGREDIENTSDATA: ', ingredientsData))
  return ingredientsData;
}
export function fetchRecipeData() {
  fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
  .then(response => response.json())
  .then(data => recipeData.push(data))
  // .then(data => console.log('RECIPEDATA: ', recipeData))
  return recipeData;
}

export function getData() {
  return Promise.all([fetchUsersData(), fetchIngredientsData(), fetchRecipeData()]);
}

export default {
  usersData,
  ingredientsData,
  recipeData,
  getData
}
