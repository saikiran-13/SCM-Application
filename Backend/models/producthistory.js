'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producthistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  producthistory.init({
    history: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'producthistory',
    timestamps:false
  });
  return producthistory;
};