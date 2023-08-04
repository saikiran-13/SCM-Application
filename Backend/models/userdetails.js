'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userdetails.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    secretkey: DataTypes.STRING,
    role:DataTypes.STRING,
    organization:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'userdetails',
    timestamps:false
  });
  return userdetails;
};