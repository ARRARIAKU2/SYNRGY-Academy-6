'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init({
    created_by: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    picture: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'car',
  });
  return cars;
};