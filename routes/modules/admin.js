const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/categories/:category_id/items', adminController.getCategoryItems)
router.get('/categories/:category_id/suggest_levels', adminController.getSuggestLevels)
router.get('/levels/:level_id/items', adminController.getLevelItems)
router.get('/items/latest_10', adminController.getLatest10)
router.get('/items/:item_id', adminController.getItem)
router.post('/item', adminController.postItem)
router.put('/items/item_id', adminController.putItem)
router.delete('/items/:item_id', adminController.deleteItem)

module.exports = router