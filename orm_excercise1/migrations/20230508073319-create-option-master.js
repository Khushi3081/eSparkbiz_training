'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('option_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      optionName: {
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
      comboId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:'combo_masters',
          key:'id'
        }
      },
        deletedAt:{
          type:Sequelize.DATE,
          allowNull:true
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('option_masters');
  }
};