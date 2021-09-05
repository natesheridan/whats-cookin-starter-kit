let mainCards = document.querySelector('#mainCards');
let galleryView = document.querySelector('#allRecipeGrid');
let addRecipeForm = document.querySelector('#addRecipeForm');
let loginButton = document.querySelector('#loginButton');
let loginForm = document.querySelector('#loginForm');
let loginPopup = document.querySelector('#loginPopup');
let addRecipeButton = document.querySelector('#addRecipeButton');
let allRecipesButton = document.querySelector('#allRecipesButton');
let homeButton = document.querySelector('#homeButton');
let savedRecipesButton = document.querySelector('#savedRecipesButton');
let scrollArrow = document.querySelector('#scrollArrow');

loginButton.addEventListener('click', showLogin);
addRecipeButton.addEventListener('click', showRecipeForm);
allRecipesButton.addEventListener('click', showRecipeGallery);
savedRecipesButton.addEventListener('click', showSavedRecipes);
homeButton.addEventListener('click', showHomeView);


function showLogin() {
  loginPopup.classList.toggle('hidden');
};

function showRecipeForm() {
  show(addRecipeForm);
  hide(mainCards);
  hide(galleryView);
};

function showRecipeGallery() {
  show(galleryView);
  hide(addRecipeForm);
  hide(mainCards);
}

function showHomeView() {
  show(mainCards);
  hide(addRecipeForm);
  hide(galleryView);
}

function showSavedRecipes() {
  showRecipeGallery();
}

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};
