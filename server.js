// EXTERNAL
require('dotenv').config()
const express = require('express')
// const bodyParse = require('body-parser')
const app = express()
// LOCAL
const { connectDB } = require('./controller/db')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const registerRouter = require('./controller/register')

const EXPRESS_PORT = process.env.PORT || 3000

// app.use(bodyParse.urlencoded({ extended: true }))
// app.use(bodyParse.json())

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
