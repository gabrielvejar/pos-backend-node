// EXTERNAL
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// LOCAL
const prisma = require('../db')
const { defaultErrorResponse } = require('./utils.controller')

/**
 * Login controller
 */
const login = async (request, response) => {
  try {
    const {
      body: { username, password }
    } = request

    // CHECK USER EXISTS
    const user = await prisma.users.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return response
        .status(400)
        .json({ success: false, error: 'username or password incorrect' })
    }

    // CHECK USER IS ACTIVE
    if (!user.active_flag) {
      return response
        .status(400)
        .json({
          success: false,
          error: 'user is not active. please contact the administrator'
        })
    }

    // CHECK PASSWORD
    const compareHash = await bcrypt.compare(password, user?.password)

    if (!compareHash) {
      return response
        .status(400)
        .json({ success: false, error: 'username or password incorrect' })
    }

    // remove password from user data to use to create token
    const { password: _, ...userForToken } = user

    // CREATE JWT
    const token = jwt.sign(userForToken, process.env.JWT_SECRET)
    return response.json({ success: true, token })
  } catch (error) {
    defaultErrorResponse(response)
  }
}

module.exports = { login }
