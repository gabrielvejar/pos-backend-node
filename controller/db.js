// EXTERNAL
const { Client } = require('pg')

let client

const DB_LOCAL = process.env.DB_LOCAL
const DB_LOCAL_CONFIG = {
  host: process.env.PGHOST_LOCAL,
  port: process.env.PGPORT_LOCAL,
  user: process.env.PGUSER_LOCAL,
  password: process.env.PGPASSWORD_LOCAL,
  database: process.env.PGDATABASE_LOCAL
}

if (DB_LOCAL.toLocaleLowerCase() === 'true') {
  client = new Client(DB_LOCAL_CONFIG)
} else {
  client = new Client()
}

/**
 * Method to connect the database
 */
const connectDB = async () => {
  await client.connect()
  console.log('Database connected! 🚀')
}

/**
 * Method to disconnect the database
 */
const disconnectDB = async () => {
  try {
    await client.end()
    console.log('Database disconnected!')
  } catch (error) {
    console.log(error)
    return { error }
  }
}

/**
 * Method to run a query
 * @param {String} queryStream
 * @param {Array} values
 */
const queryDB = async (queryStream, values) => {
  const res = await client.query(queryStream, values)
  return res
}

module.exports = { connectDB, disconnectDB, queryDB }
