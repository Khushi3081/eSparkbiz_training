'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tab_taggables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagNameId: {
        type: Sequelize.INTEGER,
        references:{
          model:'tag_infos',
          key:'id'
        }
      },
      taggableId: {
        type: Sequelize.INTEGER,
        references:{
          model:'imageInfos',
          key:'id'
        },
        references:{
          model:'videoInfos',
          key:'id'
        }
      },
      tagType: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tab_taggables');
  }
};