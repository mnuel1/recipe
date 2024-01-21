// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user');

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    serving: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
        allowNull: false,
    },    
    meal: {
        type: DataTypes.ENUM('Breakfast', 'Lunch', 'Meryenda', 'Dinner'),
        allowNull: false,
    },
    prepTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cookTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.STRING(800),
        allowNull: false,
    },
    directions: {
        type: DataTypes.STRING(800),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(800),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

User.hasMany(Recipe, { as: 'recipes', foreignKey: 'userId' });
Recipe.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = Recipe;
