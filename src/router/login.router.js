// EXTERNAL
const loginRouter = require('express').Router()
// LOCAL
const loginController = require('../controller/login.controller')

loginRouter.post('/', loginController.login)

module.exports = loginRouter
