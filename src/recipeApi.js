import axios from "axios";

const BASE_URL = 'http://localhost:8000/recipe/recipes/'

async function fetchRecipesList(searchString) {
    return await axios.get(BASE_URL, { params: { name: searchString } })
}

async function createRecipe(payload) {
    return await axios.post(BASE_URL, payload)
}

async function fetchREcipeDetails(recipeId) {
    return await axios.get(`${BASE_URL}${recipeId}/`)
}


async function deleteRecipe(recipeId) {
    return await axios.delete(`${BASE_URL}${recipeId}/`)
}

async function updateRecipe(recipeId, payload) {
    return await axios.patch(`${BASE_URL}${recipeId}/`, payload)
}

export { fetchRecipesList, createRecipe, fetchREcipeDetails, deleteRecipe, updateRecipe }