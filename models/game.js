const { Model, DataTypes } = require('sequelize');
const connection = require('./connection.js');

class Game extends Model {}

Game.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATEONLY
    },
    description: {
        type: DataTypes.TEXT
    }
}, { sequelize: connection, modelName: 'game' });

module.exports = Game;