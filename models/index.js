const dbConfig = require('../src/Config/database')
const Sequelize= require('sequelize')

const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,{
    host: dbConfig.host,
    dialect:dbConfig.dialect
})

const db={}
db.sequelize = sequelize
db.models={};
db.models.User=require('./user')(Sequelize,Sequelize.DataTypes)


module.exports= db;
