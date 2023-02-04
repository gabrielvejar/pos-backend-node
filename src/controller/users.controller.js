// EXTERNAL
const bcrypt = require('bcrypt')
// LOCAL
const { queryDB } = require('../db')
const User = require('../models/User.model')

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
    const { name, username, password, role } = req.body
    // TODO añadir validar datos de body

    if (!username || !password || !name || !role) {
      return res.status(400).json({ success: false, data: null, error: 'missing params' })
    }
    // Check username doesn't exist
    const { rows: usernameRows } = await queryDB(
      'SELECT * FROM pos_user WHERE username=$1',
      [username]
    )
    if (usernameRows?.length > 0) {
      return res.status(400).json({ success: false, error: 'username already registered' })
    }

    console.log({ name, username, password })
    const hashPassword = await bcrypt.hash(password, 10)
    const { rows, error } = await queryDB(
      'INSERT into pos_user(username, password, name, role) values($1, $2, $3, $4) RETURNING id, username, name, role',
      [username, hashPassword, name, role]
    )
    if (error) {
      return res.status(400).json({ success: false, data: null, error })
    }
    return res.status(201).json({ success: true, data: rows })
  } catch (error) {
    return res.status(400).json({ success: false, data: null, error })
  }
}

const getUser = async (req, res) => {
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

// TODO
const updateUser = async (req, res) => {
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
