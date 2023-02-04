import { hash } from 'bcrypt'
import { Router } from 'express'
import { queryDB } from './db.js'

const registerRouter = Router()

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

  const hashPassword = await hash(password, 10)

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

export default registerRouter
