// EXTERNAL
const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
// LOCAL
const { queryDB } = require('./db')

registerRouter.post('/', async (request, response) => {
  const { rows: getUsersRows } = await queryDB('SELECT * FROM pos_user')
  if (getUsersRows?.length > 0) {
    return response
      .status(400)
      .json({ success: false, error: 'there are already registered users' })
  }

  const { body } = request
  const { password } = body

  if (!password) {
    return response
      .status(400)
      .json({ success: false, error: 'missing params' })
  }

  if (password.length < 4) {
    return response
      .status(400)
      .json({ success: false, error: 'password min length is 4' })
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const { rows: postUsersRows, error } = await queryDB(
    'INSERT INTO pos_user(username, password, role, name) values ($1, $2, $3, $4) RETURNING id, username',
    ['admin', hashPassword, 1, 'admin']
  )

  if (error) {
    return response.status(400).json({ success: false, error })
  }
  const newUser = postUsersRows[0]
  return response.status(201).json({ success: true, data: newUser })
})

module.exports = registerRouter
