const express = require('express');
const verify = require('../middleware/verify');

const { 
    insertRecipe,
    editRecipe, 
    viewAllRecipe, 
    getAllRecipeOfUser, 
    deleteRecipe, 
    searchRecipe,
    getAllRecipeByCateg,
    getRecipeByFilter   
} = require('../controller/Recipe');

const userRouter = express.Router();

userRouter.post('/:id/recipe/new', verify, insertRecipe);
userRouter.patch('/recipe/edit',  verify,editRecipe);
userRouter.get('/recipes', viewAllRecipe);
userRouter.get('/user/recipes/:userId', verify, getAllRecipeOfUser);
userRouter.delete('/recipe/delete/:recipeID',  deleteRecipe);
userRouter.get('/recipe/search/:recipeName', searchRecipe);
userRouter.get('/recipe/category/:category', getAllRecipeByCateg);
    
module.exports = userRouter;
