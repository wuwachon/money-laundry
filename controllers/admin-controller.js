const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
const { User, Category, Game, Item } = require('../models')

const adminController = {
  logIn: (req, res, next) => {
    try {
      const user = req.user
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '14d' })
      res.json({
        status: 'success',
        token
      })
    } catch (err) {
      next(err)
    }
  },
  getLatest10: async (req, res, next) => {
    try {
      const limit = 10
      const items = await Item.findAll({
        raw: true,
        attributes: [
          'id', 'name', 'description', 'law', 'isLegal', 'isPublished', 'updatedAt',
          [sequelize.col("Category.type"), 'category'],
          [sequelize.col("Game.level"), 'level']  
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Game, attributes: [] }
        ],
        order: [['updatedAt', 'DESC']],
        limit
      })
      res.json({
        status: 'success',
        data: { items }
      })
    } catch (err) {
      next(err)
    }
  },
  getCategoryItems: async (req, res, next) => {
    try {
      const items = await Item.findAll({
        raw: true,
        where: { categoryId: req.params.category_id},
        attributes: [
          'id', 'name', 'description', 'law', 'isLegal', 'isPublished', 'updatedAt',
          [sequelize.col("Category.type"), 'category'],
          [sequelize.col("Game.level"), 'level']  
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Game, attributes: [] }
        ],
        order: [['gameId'], ['isPublished', 'DESC'], ['updatedAt', 'DESC']]
      })
      if (!items || items.length === 0) throw new Error('category not exist')
      res.json({
        status: 'success',
        data: { items }
      })
    } catch (err) {
      next(err)
    }
  },
  getLevelItems: async (req, res, next) => {
    try {
      const items = await Item.findAll({
        raw: true,
        where: { gameId: req.params.level_id },
        attributes: [
          'id', 'name', 'description', 'law', 'isLegal', 'isPublished', 'updatedAt',
          [sequelize.col("Category.type"), 'category'],
          [sequelize.col("Game.level"), 'level']  
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Game, attributes: [] }
        ],
        order: [['isPublished', 'DESC'], ['updatedAt', 'DESC']]
      })
      if (!items || items.length === 0) throw new Error('level not exist')
      res.json({
        status: 'success',
        data: { items }
      })
    } catch (err) {
      next(err)
    }
  },
  getSuggestLevels: async (req, res, next) => {
    try {
      // find the latest level of specific category
      const newestLevel = await Game.findOne({
        raw: true,
        where: { categoryId: req.params.category_id},
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['createdAt', 'DESC']]
      })
      // if not find, throw an error
      if (!newestLevel) throw new Error('category not exist')
      // find all the levels with count of publiched items 
      const levels = await Game.findAll({
        raw: true,
        where: {
          categoryId: req.params.category_id,
        },
        attributes: [
          'id', 'level', 
          [sequelize.col("Category.type"), 'category'],
          [sequelize.fn('COUNT', sequelize.col("Items.id")), 'countItems']
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Item, attributes: [], where: { isPublished: true } }
        ],
        group: ['Game.id']
      })
      // the suggestLevels are the levels which have countItems attribute and less than 4 published items
      const suggestLevels = levels.filter(level =>  level.countItems && level.countItems < 4)
      // if no any vacancy in exist levels, create a new level for suggestion
      if (!suggestLevels || suggestLevels.length === 0) {
        const newLevel = await Game.create({
          ...newestLevel,
          level: newestLevel.level + 1
        })
        return res.json({
          status: 'success',
          data: { suggestLevels: newLevel }
        })
      }
      res.json({
        status: 'success',
        data: { suggestLevels }
      })
    } catch (err) {
      next(err)
    }
  },
  getItem: async (req, res, next) => {

  },
  postItem: async (req, res, next) => {

  },
  putItem: async (req, res, next) => {

  },
  deleteItem: async (req, res, next) => {

  }
}

module.exports = adminController