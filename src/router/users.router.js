// EXTERNAL
const express = require('express')
const router = express.Router()
// LOCAL
const userController = require('../controller/users.controller')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', userController.getUsers)
router.post('/', userController.createUser)
router.use(verifyToken)
// router.post('/', verifyAdmin, userController.createUser)
router.get('/:userId', userController.getUser)
router.put('/:userId', verifyAdmin, userController.updateUser)
router.delete('/:userId', verifyAdmin, userController.deleteUser)

module.exports = router
