require('dotenv').config()
const { conectDB } = require('./controller/db')
const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const EXPRESS_PORT = process.env.PORT || 3000
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const registerRouter = require('./controller/register')

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

// USERS
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(EXPRESS_PORT, async () => {
  await conectDB()
  console.log('Server listen on port', EXPRESS_PORT)
})
