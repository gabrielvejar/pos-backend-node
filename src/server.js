// EXTERNAL
require('dotenv').config()
const express = require('express')
const app = express()
// LOCAL
const prisma = require('./db')
const validateJson = require('./middleware/validateJson')
const routerV1 = require('./router/v1.router')

const EXPRESS_PORT = process.env.PORT || 3000

async function main () {
  // MIDDLEWARES
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(validateJson)

  // ROUTES
  app.use('/v1', routerV1)
  // 404
  app.use((_, response) => {
    response.sendStatus(404)
  })

  // LISTEN
  app.listen(EXPRESS_PORT, async () => {
    console.log('Server listen on port', EXPRESS_PORT)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
