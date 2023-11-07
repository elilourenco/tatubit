'use strict';
const {
  Model, Sequelize
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schedule.belongsTo(models.users)
      models.users.hasMany(schedule)
      // define association here
    }
  }
  schedule.init({
    title: Datatypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName:'schedule',
  });
  return schedule;
};