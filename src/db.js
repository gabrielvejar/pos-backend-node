// EXTERNAL
const { Sequelize } = require('sequelize')

let PGDATABASE = process.env.PGDATABASE
let PGUSER = process.env.PGUSER
let PGPASSWORD = process.env.PGPASSWORD
let PGHOST = process.env.PGHOST
let PGPORT = process.env.PGPORT

const DB_LOCAL = process.env.DB_LOCAL

if (DB_LOCAL.toLocaleLowerCase() === 'true') {
  PGDATABASE = process.env.PGDATABASE_LOCAL
  PGUSER = process.env.PGUSER_LOCAL
  PGPASSWORD = process.env.PGPASSWORD_LOCAL
  PGHOST = process.env.PGHOST_LOCAL
  PGPORT = process.env.PGPORT_LOCAL
}

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres'
})

/**
 * Method to connect the database
 */
const connectDB = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

/**
 * Method to disconnect the database
 */
const disconnectDB = async () => {
  sequelize.close()
}

module.exports = { sequelize, connectDB, disconnectDB }
