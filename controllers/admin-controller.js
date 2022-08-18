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

    } catch (err) {
      next(err)
    }
  },
  getLevelItems: async (req, res, next) => {
    try {

    } catch (err) {
      next(err)
    }
  },
  getSuggestLevels: async (req, res, next) => {
    try {

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