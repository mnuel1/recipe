// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Comment = require('./comment');


const Reply = sequelize.define('Reply', {
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
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    
});

Comment.hasMany(Reply, { as: 'commentreply', foreignKey: 'commentId' });
Reply.belongsTo(Comment, { as: 'repliedcomment', foreignKey: 'commentId' });

module.exports = Reply;
