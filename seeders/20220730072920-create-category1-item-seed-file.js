'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const ItemBads = require('../public/seed/GameItemBad.json')
    const ItemGoods = [
      { name: '幫爸爸隱瞞藏私房錢的行為' },
      { name: '幫媽媽跑腿買醬油獲得跑路費' },
      { name: '收受情人或伴侶的高價禮物' },
      { name: '幫朋友結婚當收取並記錄紅包金額的招待人員' }
    ]
    const category = await queryInterface.sequelize.query(
      'SELECT id FROM Categories WHERE type = "求職";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const games = await queryInterface.sequelize.query(
      'SELECT id FROM Games;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const items = []
    games.map(game => {
      items.push(...Array.from({ length: 3 }, () => ({
        ...ItemBads[Math.floor(Math.random() * ItemBads.length)],
        is_legal: false,
        is_published: true,
        category_id: category[0].id,
        game_id: game.id,
        created_at: new Date(),
        updated_at: new Date()
      })))
      items.push({
        ...ItemGoods[Math.floor(Math.random() * ItemGoods.length)],
        is_legal: true,
        is_published: true,
        category_id: category[0].id,
        game_id: game.id,
        created_at: new Date(),
        updated_at: new Date()
      })
    })
    await queryInterface.bulkInsert('Items', items, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
