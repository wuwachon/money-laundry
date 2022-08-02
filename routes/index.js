const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item-controller')

router.get('/v1/api/games/:gameId', itemController.getGameItems)
router.get('/v1/api/categories/:categoryId', itemController.getCategoryGames)
router.get('/v1/api/categories', itemController.getCategories)
router.get('/v1/api/items', itemController.getItems)
router.get('/', (req, res) => res.send('Hello World'))

module.exports = router