const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const { queryDB } = require('./db')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const res = await queryDB('SELECT * FROM pos_user WHERE username = $1', [
    username
  ])

  // CHECK USER EXISTS
  const user = res.rows?.at(0)
  if (!user) {
    return response
      .status(400)
      .json({ success: false, error: 'username or password incorrect' })
  }

  // CHECK PASSWORD
  const compareHash = await bcrypt.compare(password, user?.password)
  console.log({ password, dbPass: user?.password, compareHash })

  if (!compareHash) {
    return response
      .status(400)
      .json({ success: false, error: 'username or password incorrect' })
  }

  const userForToken = {
    id: user.id,
    username: user.username
  }

  console.log({ userForToken })

  // TODO CREATE JWT
  const token = jwt.sign(userForToken, process.env.token)
  return response.json({ success: true, token })
})

module.exports = loginRouter
