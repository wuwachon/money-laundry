const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const routes = require('./routes')
const passport = require('./config/passport')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.use(methodOverride('_method'))
app.use(cors())

app.use('/v1/api', routes)

app.listen(PORT, () => {
  console.log(`app listen on PORT ${PORT}`)
})