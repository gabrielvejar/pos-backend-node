// EXTERNAL
require('dotenv').config()
const express = require('express')
// const bodyParse = require('body-parser')
const app = express()
// LOCAL
const { connectDB } = require('./db')
const usersRouter = require('./router/users.router')
const loginRouter = require('./router/login.router')
const registerRouter = require('./router/register.router')

const EXPRESS_PORT = process.env.PORT || 3000

// MODELS
require('./models/User.model')

// MIDDLEWARES
app.use(express.json())

// ROUTES
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(EXPRESS_PORT, async () => {
  try {
    await connectDB()
  } catch (error) {
    console.log('Error connecting database 😩')
    console.error('Error: ' + error.message)
  }
  console.log('Server listen on port', EXPRESS_PORT)
})
