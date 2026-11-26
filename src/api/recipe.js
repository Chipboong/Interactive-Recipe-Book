import { apiClient } from './apiClient'

export async function getRecipe(id){
    const endpoint = id ? `/recipes/${id}` : "/recipes";
    const res = await apiClient.get(`/api/v1${endpoint}`)
    return res.data;
}
// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  const response = await apiClient.delete(`/api/v1/recipes/${id}`);
  return response.data;
};

// Upload a new recipe (supports JSON or FormData if uploading images)
export const uploadRecipe = async (recipeData) => {
  const response = await apiClient.post("/api/v1/recipes", recipeData);
  return response.data;
};