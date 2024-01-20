// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user');
const Recipe = require('./recipe');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
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

User.hasMany(Comment, { as: 'usercomments', foreignKey: 'userId' });
Recipe.hasMany(Comment, { as: 'recipecomments', foreignKey: 'recipeId' });
Comment.belongsTo(User, { as: 'usercomment', foreignKey: 'userId' });
Comment.belongsTo(Recipe, { as: 'recipecomment', foreignKey: 'recipeId' });

module.exports = Comment;
