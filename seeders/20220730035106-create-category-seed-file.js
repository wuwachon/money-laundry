'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { type: '求職', created_at: new Date(), updated_at: new Date() }, 
      { type: '創業', created_at: new Date(), updated_at: new Date() }, 
      { type: '投資', created_at: new Date(), updated_at: new Date() }, 
      { type: '賭博', created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
