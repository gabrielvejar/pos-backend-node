// EXTERNAL
const express = require('express')
const router = express.Router()
// LOCAL
const userController = require('../controller/users.controller')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

// router.use(verifyToken)
router.get('/', userController.getUsers)
// router.use(verifyAdmin)
router.post('/', userController.createUser)
router.get('/:userId', userController.getUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)

module.exports = router
