import { compare } from 'bcrypt'
import { Router } from 'express'
import { queryDB } from './db.js'
import * as jwt from 'jsonwebtoken'

const loginRouter = Router()

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
  const compareHash = await compare(password, user?.password)
  console.log({ password, dbPass: user?.password, compareHash })

  if (!compareHash) {
    return response
      .status(400)
      .json({ success: false, error: 'username or password incorrect' })
  }

  const userForToken = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  console.log({ userForToken })

  // CREATE JWT
  const token = jwt.sign(userForToken, process.env.JWT_SECRET)
  return response.json({ success: true, token })
})

export default loginRouter
