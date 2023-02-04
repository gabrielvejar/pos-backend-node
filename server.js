import { connectDB } from './controller/db.js'
import express from 'express'
// import { urlencoded, json } from 'body-parser'
import usersRouter from './controller/users.js'
import loginRouter from './controller/login.js'
import registerRouter from './controller/register.js'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const EXPRESS_PORT = process.env.PORT || 3000

// app.use(urlencoded({ extended: true }))
app.use(express.json())

// USERS
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(EXPRESS_PORT, async () => {
  try {
    await connectDB()
    console.log('Server listen on port', EXPRESS_PORT)
  } catch (error) {
    console.log('Error connecting database 😩')
    console.log(error)
  }
})
