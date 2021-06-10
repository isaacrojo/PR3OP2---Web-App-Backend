const {Sequelize, DataTypes} = require('sequelize');
const Model = Sequelize.Model;
const {sequelize} = require('./../config/db');

class Comment extends Model {};

Comment.init({
    username: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        // allowNull: false,
    },
    content: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'comment',
});

module.exports = {Comment};