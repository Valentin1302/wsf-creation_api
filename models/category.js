const { Model, DataTypes } = require('sequelize');
const connection = require('./connection.js');

class Category extends Model {}

Category.init({
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: connection, modelName: 'category' });

module.exports = Category;