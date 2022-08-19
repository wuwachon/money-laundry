'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const levels = []
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    categories.map(category => {
      levels.push(...Array.from({ length: 5 }, (_, i) => ({
        level: i + 1,
        title: '請問以下情境何者沒有犯法？',
        category_id: category.id,
        created_at: new Date(),
        updated_at: new Date()
      })))
    })
    await queryInterface.bulkInsert('Levels', levels, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Levels', null, {})
  }
};
