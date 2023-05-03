'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('kingqueen', {
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      kingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'kingInfos',
        key: 'id',
      },
      onDelete: 'cascade'
    },
    queenId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'queenInfos',
        key: 'id',
      },
      onDelete: 'cascade'
    }
    
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
