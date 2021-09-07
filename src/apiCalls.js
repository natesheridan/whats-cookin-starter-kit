
export function fetchUsersData() {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => data)
    // .then(data => console.log(data))
    // .then(data => console.log('USERSDATA: ', usersData))
}
export function fetchIngredientsData() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
  .then(response => response.json())
  .then(data => data)
  // .then(data => console.log('INGREDIENTSDATA: ', ingredientsData))
}
export function fetchRecipeData() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
  .then(response => response.json())
  .then(data => data)
  // .then(data => console.log('RECIPEDATA: ', recipeData))
}
