'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
    pid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    battery: DataTypes.STRING,
    camera: DataTypes.STRING,
    price: DataTypes.INTEGER,
    location: DataTypes.STRING,
    status: DataTypes.STRING,
    owner:{
      type:DataTypes.STRING,
      defaultValue:"Not Sold"
    }
  }, {
    sequelize,
    modelName: 'products',
    timestamps:false
  });
  return products;
};