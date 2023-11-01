const Sequelize = require('sequelize');
const dbconfig= require('../Config/database')

const database= new Sequelize(dbconfig);

module.exports = database;