// EXTERNAL
const registerRouter = require('express').Router()
// LOCAL
const registerController = require('../controller/register.controller')

registerRouter.post('/', registerController.registerAdmin)

module.exports = registerRouter
