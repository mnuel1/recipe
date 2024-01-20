// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user'); 
const Recipe = require('./recipe');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT, 
        allowNull: false,
        validate: {
            isFloat: {
                args: {
                    min: 0,
                    max: 5,                    
                    msg: 'rating value error',
                },
            },
        },
    },  
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

User.hasMany(Like, { as: 'usercomments', foreignKey: 'userId' });
Recipe.hasMany(Like, { as: 'recipecomments', foreignKey: 'recipeId' });
Like.belongsTo(User, { as: 'usercomment', foreignKey: 'userId' });
Like.belongsTo(Recipe, { as: 'recipecomment', foreignKey: 'recipeId' });

module.exports = Like;
