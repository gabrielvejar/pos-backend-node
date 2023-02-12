// EXTERNAL
const routerV1 = require('express').Router()
// LOCAL
const loginRouter = require('./login.router')
const registerRouter = require('./register.router')
const usersRouter = require('./users.router')

// USERS
routerV1.use('/sign-up', registerRouter)
routerV1.use('/login', loginRouter)
routerV1.use('/users', usersRouter)

module.exports = routerV1
