const { User } = require('../models')

const userController = {
  getCurrentUser: (req, res, next) => {
    try {
      const user = req.user
      res.json({
        status: 'success',
        data: { currentUser: user }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController