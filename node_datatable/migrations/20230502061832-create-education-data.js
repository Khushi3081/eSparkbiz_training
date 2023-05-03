'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('educationData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseName: {
        type: Sequelize.STRING
      },
      passingYear: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userDatumId:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references:{
          model:'userData',
          field:'id'
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('educationData');
  }
};