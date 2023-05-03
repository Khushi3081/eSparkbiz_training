'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playerinfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerName: {
        type: Sequelize.STRING
      },
      playerEmail: {
        type: Sequelize.STRING
      },
      playerGame: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      teaminfoId: {
        type:Sequelize.INTEGER,
        allowNull:false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playerinfos');
  }
};