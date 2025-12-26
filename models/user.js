const { Model, DataTypes } = require('sequelize');
const connection = require('./connection.js');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, 
    {
        sequelize: connection,
    }
);

module.exports = User;