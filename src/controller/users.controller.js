// EXTERNAL
const bcrypt = require('bcrypt')
// LOCAL
const User = require('../models/User.model')
const { defaultErrorResponse } = require('./utils.controller')

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    const usersWithoutPassword = users.map(
      ({ dataValues: { password, ...userData } }) => userData
    )
    res.json({ success: true, data: usersWithoutPassword })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
}

const createUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, username, password, roleId }
    } = req
    // TODO añadir validar datos de body

    // TODO roleId 0 lo toma falsy
    if (!username || !password || !firstName || !lastName || !roleId) {
      return res
        .status(400)
        .json({ success: false, data: null, error: 'missing params' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const {
      dataValues: { password: respPassword, ...restNewUser }
    } = await User.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
      roleId
    })

    return res.status(201).json({ success: true, data: restNewUser })
  } catch (error) {
    // Unique constraint error - username
    if (error?.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ success: false, data: null, error: 'username must be unique' })
    }
    // Foreign key error - roleId
    if (error?.name === 'SequelizeForeignKeyConstraintError') {
      return res
        .status(400)
        .json({ success: false, data: null, error: 'roleId invalid' })
    }
    return defaultErrorResponse(res)
  }
}

const getUser = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findByPk(userId)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    const {
      dataValues: { password, ...restUser }
    } = user

    res.status(200).json({ success: true, data: restUser })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
}

const updateUser = async (req, res) => {
  try {
    const {
      body,
      params: { userId }
    } = req

    // TODO añadir validar datos de body

    // Check user exists
    const user = await User.findByPk(userId)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    const {
      dataValues: { password, ...restUser }
    } = user

    await User.update(body, {
      where: {
        id: userId
      }
    })

    // Update new values to response data
    const data = { ...restUser }
    for (const key in body) {
      if (Object.hasOwnProperty.call(data, key)) {
        data[key] = body[key]
      }
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    defaultErrorResponse(res)
  }
}

const deleteUser = async (req, res) => {
  try {
    const {
      params: { userId }
    } = req

    // Check user exists
    const user = await User.findByPk(userId)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    await User.update(
      { activeFlag: false },
      {
        where: {
          id: userId
        }
      }
    )

    const {
      dataValues: { password, ...restUser }
    } = user

    res.status(200).json({ success: true, data: restUser })
  } catch (error) {
    defaultErrorResponse(res)
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
