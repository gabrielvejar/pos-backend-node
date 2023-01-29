const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { queryDB } = require('./db')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await queryDB(
    'SELECT * FROM users WHERE username = $1',
    [username]
  )
  console.log({ user })
})

module.exports = loginRouter
