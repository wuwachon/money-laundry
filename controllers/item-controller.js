const { Category, Game, Item } = require('../models')

const itemController = {
  getItems: async (req, res, next) => {
    try {
      const items = await Item.findAll()
      res.json({
        status: 'success',
        data: items.toJSON()
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
  getCategoryGames: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.categoryId, {
        include: [Game]
      })
      res.json({
        status: 'success',
        data: category.toJSON()
      })
    } catch (err) {
      next(err)
    }
  },
  getGameItems: async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.gameId, {
        include: [Category, Item]
      })
      res.json({
        status: 'success',
        data: game.toJSON()
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = itemController