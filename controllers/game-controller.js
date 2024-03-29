const sequelize = require('sequelize')
const { Category, Level, Item } = require('../models')

const itemController = {
  getItems: async (req, res, next) => {
    try {
      const items = await Item.findAll()
      res.json({
        status: 'success',
        data: items
      })
    } catch (err) {
      next(err)
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll()
      res.json({
        status: 'success',
        data: categories
      })
    } catch (err) {
      next(err)
    }
  },
  getCategoryLevels: async (req, res, next) => {
    try {
      const levels = await Level.findAll({
        raw: true,
        where: {
          categoryId: req.params.categoryId
        },
        attributes: [
          'id',
          'level',
          'title',
          'categoryId',
          [sequelize.fn('COUNT', sequelize.col('Items.id')), 'countItems']
        ],
        include: [
          { model: Item, attributes: [], where: { isPublished: true } }
        ],
        group: ['Level.id'],
        order: ['level']
      })

      res.json({
        status: 'success',
        data: { Levels: levels }
      })
    } catch (err) {
      next(err)
    }
  },
  getLevelItems: async (req, res, next) => {
    try {
      const level = await Level.findByPk(req.params.levelId, {
        include: [
          Category,
          { model: Item, where: { isPublished: true } }
        ]
      })
      res.json({
        status: 'success',
        data: level.toJSON()
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = itemController