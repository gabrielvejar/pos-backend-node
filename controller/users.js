const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { queryDB } = require('./db')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const { rows } = await queryDB('SELECT * FROM pos_user')
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
})

router.post('/', verifyAdmin, async (req, res) => {
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
})

router
  .route('/:userId')
  .get(async (req, res) => {
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
  })
  // TODO
  .put(async (req, res) => {
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
  })
  // TODO
  .delete(async (req, res) => {
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
  })

module.exports = router
