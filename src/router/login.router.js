// EXTERNAL
const loginRouter = require('express').Router()
// LOCAL
const loginController = require('../controller/login.controller')
const { validateLogin } = require('../middleware/validators/users')

loginRouter.post('/', validateLogin, loginController.login)

module.exports = loginRouter
