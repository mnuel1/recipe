const Recipe = require('../database/model/recipe');

const insertRecipe = async (req, res) => {

    const newRecipeData = req.body;

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
    
    try {
        const recipe = await Recipe.findAll();

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found! ' });
        }
        res.status(200).json({msg: 'Succesfully fetch the recipes', recipe} );
    } catch (error) {
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

    }catch (error) {
        res.status(500).send('Something went wrong!');
    }
    

}
const getRecipeByFilter = async (req, res) => {

}

module.exports = {
    insertRecipe,
    editRecipe,
    viewAllRecipe,
    getAllRecipeOfUser,
    deleteRecipe,
    searchRecipe,
    getAllRecipeByCateg,
    getRecipeByFilter
}