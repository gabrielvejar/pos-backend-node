// EXTERNAL
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// LOCAL
const Role = require('../models/Role.model')
const User = require('../models/User.model')
const { defaultErrorResponse } = require('./utils.controller')

const login = async (request, response) => {
  try {
    const {
      body: { username, password }
    } = request

    // CHECK USER EXISTS
    const user = await User.findOne({
      include: { model: Role },
      where: {
        username
      }
    })

    if (!user) {
      return response
        .status(400)
        .json({ success: false, error: 'username or password incorrect' })
    }

    // CHECK PASSWORD
    const compareHash = await bcrypt.compare(password, user?.password)

    if (!compareHash) {
      return response
        .status(400)
        .json({ success: false, error: 'username or password incorrect' })
    }

    const {
      dataValues: { password: userPassword, RoleId, Role: role, ...userData }
    } = user
    const {
      dataValues: { createdAt, updatedAt, id: roleId, ...cleanRole }
    } = role
    const userForToken = { ...userData, roleId, ...cleanRole }

    // CREATE JWT
    const token = jwt.sign(userForToken, process.env.JWT_SECRET)
    return response.json({ success: true, token })
  } catch (error) {
    console.log({ loginError: error })
    defaultErrorResponse(response)
  }
}

module.exports = { login }
