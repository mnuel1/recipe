const Like = require('../database/model/like')
const Comment = require('../database/model/comment')
const Reply = require('../database/model/reply')

const rateRecipe = async (req, res) => {
    try {
        const userId = req.params.id; 
        const recipeId = req.params.recipeId; 
        
        // Find existing rating
        const existingRating = await Like.findOne({
            where: {
                userId: userId,
                recipeId: recipeId,
            }
        });

        if (existingRating) {            
            await existingRating.update({
                rating: req.params.rating,
            });
            res.status(200).json({ message: 'Rating updated successfully' });
        } else {            
            // If rating doesn't exist, create a new one
            await Like.create({
                userId: userId,
                recipeId: recipeId,
                rating: req.params.rating,
            });
            res.status(200).json({ message: 'Recipe rated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
};

const commentRecipe = async (req, res) => {
    try {
        const userId = req.body.id; 
        const recipeId = req.body.recipeId; 

        await Comment.create({
            userId: userId,
            recipeId: recipeId,
            comment: req.body.comment,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
}

const replyComment = async (req, res) => {
    try {
        const commentId = req.body.id; 
        
        await Reply.create({
            commentId: commentId,            
            comment: req.body.comment,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
}

module.exports = {
    rateRecipe,   
    commentRecipe,
    replyComment, 
}