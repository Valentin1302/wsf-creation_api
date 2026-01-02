const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

connection.authenticate().then(() => console.log('Database connected'));

module.exports = connection;