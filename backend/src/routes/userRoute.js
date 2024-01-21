const express = require('express');
const verify = require('../middleware/verify');
const upload = require('../middleware/uploadMiddleWare');

const { 
    insertRecipe,
    editRecipe, 
    viewAllRecipe, 
    getAllRecipeOfUser, 
    deleteRecipe, 
    searchRecipe,
    getAllRecipeByCateg,
    getRecipeByFilter,
    getTopPicks,
    getRecommendForYou
} = require('../controller/Recipe');

const userRouter = express.Router();

userRouter.post('/:id/recipe/new', verify, upload.single("file"), insertRecipe);
userRouter.patch('/recipe/edit',  verify,editRecipe);
userRouter.get('/recipes', viewAllRecipe);
userRouter.get('/user/recipes/:userId', verify, getAllRecipeOfUser);
userRouter.delete('/recipe/delete/:recipeID',  deleteRecipe);
userRouter.get('/recipe/search/:recipeName', searchRecipe);
userRouter.get('/recipe/category/:category', getAllRecipeByCateg);
userRouter.get('/recipe/toppicks', getTopPicks);
    
module.exports = userRouter;
