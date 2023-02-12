// EXTERNAL
const routerV1 = require('express').Router()
// LOCAL
// const usersRouter = require('./users.router')
const loginRouter = require('./login.router')
const registerRouter = require('./register.router')

routerV1.use('/sign-up', registerRouter)
routerV1.use('/login', loginRouter)

module.exports = routerV1
