const { Model, DataTypes } = require('sequelize');
const connection = require('./connection.js');

class Publisher extends Model {}

Publisher.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: connection, modelName: 'publisher' });

module.exports = Publisher;