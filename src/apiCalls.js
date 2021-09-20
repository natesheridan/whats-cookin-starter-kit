
export function fetchUsersData() {
    return fetch('https://whatscookingbe.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {domUpdates.popupMessage(error, 3000, "red")})
    // .then(data => console.log('USERSDATA: ', usersData))
}
export function fetchIngredientsData() {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/ingredients')
  .then(response => response.json())
  .then(data => data)
  .catch(error => {domUpdates.popupMessage(error, 3000, "red")})
  // .then(data => console.log('INGREDIENTSDATA: ', ingredientsData))
}
export function fetchRecipeData() {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/recipes')
  .then(response => response.json())
  .then(data => data)
  .catch(error => {domUpdates.popupMessage(error, 3000, "red")})
  // .then(data => console.log('RECIPEDATA: ', recipeData))
}
export function postIngredient(id, ingredientID, ingredientAmount) {
  return fetch('https://whatscookingbe.herokuapp.com/api/v1/users',
  {
    method: 'POST',
    body: JSON.stringify({userID: id, ingredientID: ingredientID, ingredientModification: ingredientAmount}),
    headers: {
        "Content-Type":"application/json"
    },
  })
.then(response => response.json())
.catch(error => {domUpdates.popupMessage(error, 3000, "red")})

}
//