const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Kapil@12345678',
    database: 'candy', // database name
});

module.exports = sequelize;
