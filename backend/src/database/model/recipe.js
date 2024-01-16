// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user'); // Import the User model

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('Breakfast', 'Lunch', 'Meryenda', 'Dinner'),
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
