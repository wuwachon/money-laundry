const express = require('express')
const router = express.Router()

const gameController = require('../../controllers/game-controller')

router.get('/levels/:levelId', gameController.getLevelItems)
router.get('/categories/:categoryId', gameController.getCategoryLevels)
router.get('/categories', gameController.getCategories)
router.get('/items', gameController.getItems)

module.exports =router