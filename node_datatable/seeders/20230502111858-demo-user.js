'use strict';
const {faker} = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userData', [
     {
    firstName:faker.name.firstName(),
     lastName:faker.name.lastName(),
     email:faker.internet.email(),
     gender:faker.options('male','feamle'),
     createdAt:faker.date.between() ,
     updatedAt:faker.date.between(),
     }
    ])
    },  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
