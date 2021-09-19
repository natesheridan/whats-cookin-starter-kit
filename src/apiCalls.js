
export function fetchUsersData() {
    return fetch('https://whatscookingbe.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => data)
    // .then(data => console.log('USERSDATA: ', usersData))
}
export function fetchIngredientsData() {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/ingredients')
  .then(response => response.json())
  .then(data => data)
  // .then(data => console.log('INGREDIENTSDATA: ', ingredientsData))
}
export function fetchRecipeData() {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/recipes')
  .then(response => response.json())
  .then(data => data)
  // .then(data => console.log('RECIPEDATA: ', recipeData))
}
export function addIngredientToPantry() {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/users',
  {
    method: 'POST',
    body: JSON.stringify({userID: 2, ingredientID: 11297, ingredientModification: 100 }),
    headers: {
        "Content-Type":"application/json"
    },
  })
.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.warn(error))

}