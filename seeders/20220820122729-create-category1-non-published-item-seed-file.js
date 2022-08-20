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
    const levels = await queryInterface.sequelize.query(
      `SELECT id FROM Levels WHERE category_id = ${category[0].id};`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    function shuffle(arr) {
      const n = arr.length;
      for (let i = n - 1; i > 0; i -= 1) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr
    }
    const items = []
    const maxItemNum = 2
    levels.map(level => {
      items.push(...Array.from({ length: Math.ceil(Math.random() * maxItemNum) }, () => ({
        ...ItemBads[Math.floor(Math.random() * ItemBads.length)],
        is_legal: false,
        is_published: false,
        category_id: category[0].id,
        level_id: level.id,
        created_at: new Date(),
        updated_at: new Date()
      })))
      items.push(...Array.from({ length: Math.ceil(Math.random() * maxItemNum) }, () => ({
        ...ItemGoods[Math.floor(Math.random() * ItemGoods.length)],
        is_legal: true,
        is_published: false,
        category_id: category[0].id,
        level_id: level.id,
        created_at: new Date(),
        updated_at: new Date()
      })))
    })
    const itemSeed = shuffle(items)
    await queryInterface.bulkInsert('Items', itemSeed, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
