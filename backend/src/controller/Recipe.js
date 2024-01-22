const Recipe = require('../database/model/recipe');
const Like = require('../database/model/like');
const sequelize = require('../database')

const insertRecipe = async (req, res) => {
    const newRecipeData = req.body;
    newRecipeData.image = "uploads/" + req.file.filename;

    // Replace single commas with double commas in ingredients
    if (newRecipeData.ingredients) {
        newRecipeData.ingredients = newRecipeData.ingredients.replace(/,/g, ",,");
    }

    // Replace single commas with double commas in directions
    if (newRecipeData.directions) {
        newRecipeData.directions = newRecipeData.directions.replace(/,/g, ",,");
    }

    await Recipe.create(newRecipeData)
    .then(newRecipe => {
        // console.log('New recipe created:', newRecipe.toJSON());
        res.status(200).json({msg: 'Recipe Successfully Inserted'});
    })
    .catch(error => {
        console.error('Error creating recipe:', error);
        res.status(500).send('Error creating recipe');
    });
}

const editRecipe = async (req, res) => 
{   
    const recipeID = req.body.recipeID;
        
    try {
        const recipe = await Recipe.findByPk(recipeID);

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }

        recipe.name = req.body.name || recipe.name;
        recipe.category = req.body.category || recipe.category;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.directions = req.body.directions || recipe.directions;
        recipe.description = req.body.description || recipe.description;
        
        await recipe.save();
        res.status(200).json({msg: 'Recipe Successfully Updated'});

    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
}

const viewAllRecipe = async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');

    try {
        const recipe = await Recipe.findAll();

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }
        console.log(recipe);
        const formattedRecipes = recipe.map(recipe => ({
            ...recipe.dataValues,
            ingredients: recipe.ingredients.split(',,').map(item => item.trim()),
            directions: recipe.directions.split(',,').map(step => step.trim())
        }));
        
        res.status(200).json({msg: 'Succesfully fetch the recipes', recipe: formattedRecipes} );
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }

}

const getAllRecipeOfUser = async (req, res) => {
    
    try {
        const recipe = await Recipe.findAll({
            where: {
                userId: req.params.userId
            }
        })
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }

        res.status(200).json({msg: 'Succesfully fetch the recipes', recipe} );
        
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
    
}

const deleteRecipe = async (req, res) => {
    const recipeID = req.params.recipeID;

    try {
        const recipe = await Recipe.findByPk(recipeID);
        
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }

        await recipe.destroy();

        res.status(200).json({msg: 'Recipe Successfully Deleted'});

    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
    
}

const searchRecipe = async (req, res) => {

    const recipeName = req.params.recipeName;

    try {
        const recipe = await Recipe.findOne({
            where: {
                name : recipeName
            }
        });

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }
        res.status(200).json({msg: 'Recipe found', recipe} );

    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
    
}

const getAllRecipeByCateg = async (req, res) => {

    try {
        const recipe = await Recipe.findAll({
            where: {
                category: req.params.category
            }
        })

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }
        res.status(200).json({msg: 'Succesfully fetch the recipes', recipe} );

    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
    

}

const getRecipeByFilter = async (req, res) => {
   
    try {
        const sortBy = req.query.sortBy || 'name';
        const sortOrder = req.query.sortOrder || 'ASC'; 
        
        const recipes = await Recipe.findAll({
            order: [[sortBy, sortOrder]],
        });

        res.status(200).json({ recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
    
}

const getTopPicks = async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {        
        const topRatedLikes = await Like.findAll({
            attributes: [
                'recipeId',
                [sequelize.fn('avg', sequelize.col('rating')), 'avgRating'],
            ],
            group: ['recipeId'],
            order: [[sequelize.literal('avgRating'), 'DESC']],
            limit: 4,
        });

        const topRatedRecipeIds = topRatedLikes.map((like) => like.recipeId);
        
        const topRatedRecipes = await Recipe.findAll({
            where: { id: topRatedRecipeIds },
        });
        
        if (topRatedLikes.length === 0) {            
            const currentTime = new Date().getHours();
            let mealType = 'Breakfast';

            if (currentTime >= 6 && currentTime <= 8) {
                mealType = 'Breakfast';
            } else if (currentTime >= 12 && currentTime < 13) {
                mealType = 'Lunch';
            } else if (currentTime >= 15 && currentTime < 16) {
                mealType = 'Meryenda';
            } else if (currentTime >= 18 && currentTime < 20) {
                mealType = 'Dinner';
            }            
            const recipesByTime = await Recipe.findAll({
                where: { mealType: mealType },
                limit: 4,
            });

            const formattedRecipes = recipesByTime.map(recipe => ({
                ...recipe.dataValues,
                ingredients: recipe.ingredients.split(',,').map(item => item.trim()),
                directions: recipe.directions.split(',,').map(step => step.trim())
            }));    
            res.status(200).json({
                msg: 'Successfully fetch the recipes',
                recipe: formattedRecipes,
            });
        } else {         
            const formattedRecipes = topRatedRecipes.map(recipe => ({
                ...recipe.dataValues,
                ingredients: recipe.ingredients.split(',,').map(item => item.trim()),
                directions: recipe.directions.split(',,').map(step => step.trim())
            }));    
            res.status(200).json({
                msg: 'Successfully fetch the recipes',
                recipe: formattedRecipes,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
};

module.exports = { getTopPicks };


const getRecommendForYou = async (req, res) => {

    try {
        const recipe = await Recipe.findAll({
            where: {
                category: req.params.category
            }
        })

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }
        res.status(200).json({msg: 'Succesfully fetch the recipes', recipe} );

    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
    

}


module.exports = {
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
}