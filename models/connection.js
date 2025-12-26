const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DATABSE_URL);

connection.authenticate().then(() => console.log('Database connected'));

module.exports = connection;