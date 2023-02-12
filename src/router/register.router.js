// EXTERNAL
const registerRouter = require('express').Router()
// LOCAL
const registerController = require('../controller/register.controller')
const { validateSignUp } = require('../middleware/validators/users')

registerRouter.post('/', validateSignUp, registerController.registerAdmin)

module.exports = registerRouter
