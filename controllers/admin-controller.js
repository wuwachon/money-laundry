const jwt = require('jsonwebtoken')
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

  },
  getCategoryItems: async (req, res, next) => {

  },
  getLevelItems: async (req, res, next) => {

  },
  getSuggestLevels: async (req, res, next) => {

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