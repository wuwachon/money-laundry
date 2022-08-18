const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const games = require('./modules/games')
const admin = require('./modules/admin')

const { authenticated, authenticateAdmin } = require('../middlewares/api-auth')
const { apiErrorHandler } = require('../middlewares/error-handler')

const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')

router.get('/current_user', authenticated, userController.getCurrentUser)
router.post(
  '/admin/login',
  passport.authenticate('local', { session: false }),
  authenticateAdmin,
  adminController.logIn
)
router.use('/admin', authenticated, authenticateAdmin, admin)
router.use('/games', games)

router.use('/', apiErrorHandler)

module.exports = router