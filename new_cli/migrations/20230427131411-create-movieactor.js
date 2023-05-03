'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movieactor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			actorId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'actorinfos',
					key: 'id',
				},
				onDelete: 'cascade'
			},
			movieId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'movieinfos',
					key: 'id',
				},
				onDelete: 'cascade'
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movieinfos');
  }
};