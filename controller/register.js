const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const { queryDB } = require('./db')

registerRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  if (!username || !password) {
    return response.status(400).json({ success: false, error: 'missing params' })
  }

  const hashPassword = await bcrypt.hash(password, 10)
  console.log({ hashPassword })

  const { rows, error } = await queryDB(
    'INSERT INTO pos_user(username, password) values ($1, $2) RETURNING id, username',
    [username, hashPassword]
  )

  if (error) {
    return response.status(400).json({ success: false, error })
  }
  const newUser = rows[0]
  return response.json({ success: true, data: newUser })
})

module.exports = registerRouter
