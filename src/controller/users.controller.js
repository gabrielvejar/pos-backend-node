// EXTERNAL
const bcrypt = require('bcrypt')
// LOCAL
const { queryDB } = require('../db')
const User = require('../models/User.model')
const { defaultErrorResponse } = require('./utils.controller')

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    console.log({ users })
    res.json({ success: true, data: users })
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
    const { body, params: { userId } } = req

    const [rowsCount] = await User.update(
      body,
      {
        where: {
          id: userId
        }
      }
    )
    if (!rowsCount) {
      return res
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    const {
      dataValues: { password, ...restUser }
    } = await User.findByPk(userId)

    res.status(200).json({ success: true, data: restUser })
  } catch (error) {
    defaultErrorResponse(res)
  }
}

// TODO
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { rows, error } = await queryDB(
      'SELECT * FROM pos_user WHERE id=$1',
      [userId]
    )
    if (error) {
      return res.status(400).json({ success: false, data: null, error })
    }
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
