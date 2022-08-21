const jwt = require('jsonwebtoken')
const assert = require('assert')
const sequelize = require('sequelize')
const { Category, Level, Item } = require('../models')
const { Op } = require('sequelize')

const adminController = {
  logIn: (req, res, next) => {
    try {
      const user = req.user
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '14d' })
      res.json({
        status: 'success',
        token,
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
          'id',
          'name',
          'description',
          'law',
          'isLegal',
          'isPublished',
          'updatedAt',
          [sequelize.col('Category.type'), 'category'],
          [sequelize.col('Level.level'), 'level'],
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Level, attributes: [] },
        ],
        order: [['updatedAt', 'DESC']],
        limit,
      })
      res.json({
        status: 'success',
        data: { items },
      })
    } catch (err) {
      next(err)
    }
  },
  getCategoryItems: async (req, res, next) => {
    try {
      const items = await Item.findAll({
        raw: true,
        where: { categoryId: req.params.category_id },
        attributes: [
          'id',
          'name',
          'description',
          'law',
          'isLegal',
          'isPublished',
          'updatedAt',
          [sequelize.col('Category.type'), 'category'],
          [sequelize.col('Level.level'), 'level'],
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Level, attributes: [] },
        ],
        order: [['levelId'], ['isPublished', 'DESC'], ['updatedAt', 'DESC']],
      })
      if (!items || items.length === 0) throw new Error('category not exist')
      res.json({
        status: 'success',
        data: { items },
      })
    } catch (err) {
      next(err)
    }
  },
  getLevelItems: async (req, res, next) => {
    try {
      const items = await Item.findAll({
        raw: true,
        where: { levelId: req.params.level_id },
        attributes: [
          'id',
          'name',
          'description',
          'law',
          'isLegal',
          'isPublished',
          'updatedAt',
          [sequelize.col('Category.type'), 'category'],
          [sequelize.col('Level.level'), 'level'],
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Level, attributes: [] },
        ],
        order: [
          ['isPublished', 'DESC'],
          ['updatedAt', 'DESC'],
        ],
      })
      if (!items || items.length === 0) throw new Error('level not exist')
      res.json({
        status: 'success',
        data: { items },
      })
    } catch (err) {
      next(err)
    }
  },
  getSuggestLevels: async (req, res, next) => {
    try {
      // find the latest level of specific category
      const newestLevel = await Level.findOne({
        raw: true,
        where: {
          categoryId: req.params.category_id,
        },
        attributes: ['id', 'level', [sequelize.col('Category.type'), 'category']],
        include: { model: Category, attributes: [] },
        order: [['level', 'DESC']],
      })
      // if not find, throw an error
      if (!newestLevel) throw new Error('category not exist')
      // find all the levels with count of published items
      const levels = await Level.findAll({
        raw: true,
        where: {
          categoryId: req.params.category_id,
        },
        attributes: [
          'id',
          'level',
          [sequelize.col('Category.type'), 'category'],
          [sequelize.fn('COUNT', sequelize.col('Items.id')), 'countItems'],
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Item, attributes: [], where: { isPublished: true } },
        ],
        group: ['Level.id'],
      })
      // the suggestLevels are the levels which have countItems attribute and less than 4 published items
      const suggestLevels = levels.filter((level) => level.countItems && level.countItems < 4)
      // if no any vacancy in exist levels, create a new level for suggestion
      if (!suggestLevels || suggestLevels.length === 0) {
        if (levels.some((level) => level.id === newestLevel.id)) {
          const newLevel = await Level.create({
            categoryId: req.params.category_id,
            level: newestLevel.level + 1,
          })
          return res.json({
            status: 'success',
            data: { suggestLevels: [newLevel] },
          })
        }
        return res.json({
          status: 'success',
          data: { suggestLevels: [newestLevel] },
        })
      }
      res.json({
        status: 'success',
        data: { suggestLevels },
      })
    } catch (err) {
      next(err)
    }
  },

  // GET /v1/api/admin/items/:item_id
  getItem: async (req, res, next) => {
    try {
      const itemId = Number(req.params.item_id)
      assert(itemId || itemId === 0, 'Params item id is required.')

      const targetItem = await Item.findOne({
        itemId,
        attributes: [
          'id',
          'name',
          'description',
          'law',
          'isLegal',
          'isPublished',
          [sequelize.col('Category.type'), 'category'],
          [sequelize.col('Level.level'), 'level'],
        ],
        include: [
          { model: Category, attributes: [] },
          { model: Level, attributes: [] },
        ],

        raw: true,
      })

      res.status(200).json({
        status: 'success',
        data: { item: targetItem },
      })
    } catch (error) {
      next(error)
    }
  },

  // POST /v1/api/admin/item
  postItem: async (req, res, next) => {
    try {
      const { categoryId, levelId, name, isLegal, description, law, isPublished } = req.body
      assert(categoryId && levelId, 'categoryId and levelId are required.')

      if (isPublished) {
        const { count } = await Item.findAndCountAll({
          where: {
            categoryId: categoryId,
            levelId: levelId,
            isPublished: { [Op.eq]: [1] },
          },
        })
        assert(count < 4, 'There are already 4 isPublished item.')

        if (!isLegal) {
          assert(description && law, 'description and law field are required for publishing.')
        }
      }

      await Item.create({
        categoryId,
        levelId,
        name,
        isLegal,
        description,
        law,
        isPublished,
      })

      res.status(201).json({ status: 'success' })
    } catch (error) {
      next(error)
    }
  },

  // PUT /v1/api/admin/items/item_id
  putItem: async (req, res, next) => {
    try {
      const itemId = Number(req.params.item_id)
      assert(itemId || itemId === 0, 'Params item id is required.')

      const targetItem = await Item.findByPk(itemId)
      assert(targetItem, 'Target item not exist.')

      const { categoryId, levelId, name, isLegal, description, law, isPublished } = req.body
      assert(categoryId || levelId, 'categoryId and levelId are required.')

      if (isPublished) {
        const { count } = await Item.findAndCountAll({
          where: {
            categoryId: categoryId,
            levelId: levelId,
            isPublished: { [Op.eq]: [1] },
          },
        })
        // 如果不是原來的類別和關卡，要檢查該關卡選項數量
        if (targetItem.levelId !== levelId || targetItem.categoryId !== categoryId) {
          assert(count < 4, 'There are already 4 isPublished item.')
        }
        
        if (!isLegal) {
          assert(description && law, 'description and law field are required for publishing.')
        }
      }

      await targetItem.update({
        categoryId,
        levelId,
        name,
        isLegal,
        description,
        law,
        isPublished,
      })

      res.status(200).json({ status: 'success' })
    } catch (error) {
      next(error)
    }
  },

  // DELETE /v1/api/admin/items/:item_id
  deleteItem: async (req, res, next) => {
    try {
      const itemId = Number(req.params.item_id)
      assert(itemId || itemId === 0, 'Params item id is required.')

      const targetItem = await Item.findByPk(itemId)
      assert(targetItem, 'Target item not exist.')

      const levelItems = await Item.findAll({
        where: { levelId: targetItem.levelId },
        attributes: ['isLegal', 'isPublished'],
        raw: true,
      })

      if (targetItem.isLegal && targetItem.isPublished) {
        const isLegalLevelItems = levelItems.filter((item) => item.isLegal === 1 && item.isPublished === 1)
        assert(isLegalLevelItems.length > 1, 'The last isLegal item can not be deleted.')
      }

      await targetItem.destroy()
      res.status(200).json({ status: 'success' })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = adminController
