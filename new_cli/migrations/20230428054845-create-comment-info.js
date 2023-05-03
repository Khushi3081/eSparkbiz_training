'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commentInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentName: {
        type: Sequelize.STRING
      },
      commentType: {
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
      commentTableId: {
        type: Sequelize.INTEGER,
				allowNull: false,
          references:{
            model:'imageInfos',
            key:'id'
          },
        references:{
          model:'videoInfos',
          key:'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('commentInfos');
  }
};