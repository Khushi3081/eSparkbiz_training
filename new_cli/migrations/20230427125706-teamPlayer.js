'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('playerinfos',{
      references:{
        table:'teaminfos',
        field:'id'
      }, 
      type:'foreign key',
      fields:['teaminfoId']
        
      }
    )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('players',{
      fields:['teaminfoId'],
      type:'foreign key',
      references:{
        table:'teaminfos',
        field:'id'
      }
    }
  )

  }
};
