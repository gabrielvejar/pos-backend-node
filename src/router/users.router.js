// EXTERNAL
const express = require('express')
const router = express.Router()
// LOCAL
const userController = require('../controller/users.controller')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const checkAuthorization = require('../middleware/checkAuthorization')

// router.use(verifyToken)
// TODO
// router.use(checkAuthorization.checkUserIsUsersAdmin)

router.get('/', userController.getUsers)
// router.use(verifyAdmin)
router.get('/:userId', userController.getUser)

router.post('/', userController.createUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)

module.exports = router
