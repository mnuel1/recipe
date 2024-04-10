import { URL, PORT } from "../config";
import axios from "axios";

const API_BASE_URL = `${URL}${PORT}`


export const RecipeAPI = {
    getAllRecipes: async (endpoint) => {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        const { data } = response
        return data;
    },
    getTopPicksRecipes: async (endpoint) => {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        const { data } = response
        return data;
    }, 
    createNewRecipe: async (endpoint, recipeData) => {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, recipeData, {withCredentials: true});
        const { data } = response
        return data;
    },
}

