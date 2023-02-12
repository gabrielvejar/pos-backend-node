// EXTERNAL
const express = require('express')
const router = express.Router()
// LOCAL
const userController = require('../controller/users.controller')
const verifyToken = require('../middleware/verifyToken')
const { checkRoleAuth } = require('../middleware/checkAuthorization')

// json fields validations
const { validateCreateUser } = require('../middleware/validators/users')

// verify user token
router.use(verifyToken)

router.get(
  '/',
  checkRoleAuth(['ADMIN', 'SUPERVISOR']),
  userController.getUsers
)
router.get('/:userId', userController.getUser)

// Only admins allowed on the following endpoints
router.use(checkRoleAuth(['ADMIN']))

router.post('/', validateCreateUser, userController.createUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)

module.exports = router
