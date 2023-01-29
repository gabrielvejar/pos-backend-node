const express = require('express')
const router = express.Router()
const { queryDB } = require('./db')

router.get('/', async (req, res) => {
  try {
    const { rows } = await queryDB('SELECT * FROM user')
    res.json({ success: true, data: rows })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    console.log({ name })
    const { rows, error } = await queryDB(
      'INSERT into user(name) values($1) RETURNING id, name',
      [name]
    )
    if (error) {
      return res.status(400).json({ success: false, data: null, error })
    }
    res.status(201).json({ success: true, data: rows })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
})

router
  .route('/:userId')
  .get(async (req, res) => {
    try {
      const { userId } = req.params
      const { rows, error } = await queryDB('SELECT * FROM user WHERE id=$1', [userId])
      if (error) {
        return res.status(400).json({ success: false, data: null, error })
      }
      res.json({ success: true, data: rows })
    } catch (error) {
      res.status(400).json({ success: false, data: null, error })
    }
  })
  .put(async (req, res) => {
    try {
      const { userId } = req.params
      const { rows, error } = await queryDB('SELECT * FROM user WHERE id=$1', [userId])
      if (error) {
        return res.status(400).json({ success: false, data: null, error })
      }
      res.json({ success: true, data: rows })
    } catch (error) {
      res.status(400).json({ success: false, data: null, error })
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId } = req.params
      const { rows, error } = await queryDB('SELECT * FROM user WHERE id=$1', [userId])
      if (error) {
        return res.status(400).json({ success: false, data: null, error })
      }
      res.json({ success: true, data: rows })
    } catch (error) {
      res.status(400).json({ success: false, data: null, error })
    }
  })

module.exports = router
