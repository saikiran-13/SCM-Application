'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image:{
        type:Sequelize.STRING
      },
      battery: {
        type: Sequelize.STRING
      },
      camera: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      owner:{
        type: Sequelize.STRING,
        defaultValue:"Not Sold"
      },
      transited:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};