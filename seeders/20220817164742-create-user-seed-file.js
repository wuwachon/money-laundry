'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = Array.from({ length: 5 }, (_, i) => ({
      account: `root${i}`,
      password: bcrypt.hashSync('12345678', 10),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }))
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
