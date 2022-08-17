const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// Strategies
passport.use(new LocalStrategy(
  {
    usernameField: 'account',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, account, password, callbackFn) => {
    try {
      const user = await User.findOne({ where: { account }, raw: true })
      if (!user) throw new Error('Account or Password error!')
      const isMatch = bcrypt.compareSync(password, user.password)
      if (!isMatch) throw new Error('Account or Password error!')
      delete user.password
      return callbackFn(null, user)
    } catch (err) {
      callbackFn(err)
    }
  }
))

passport.use(new JWTStrategy(
  jwtOptions,
  async (jwtPayload, callbackFn) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        attributes: ['id', 'account', 'isAdmin'],
        raw: true
      })
      return callbackFn(null, user)
    } catch (err) {
      callbackFn(err)
    }
  }
))

module.exports = passport