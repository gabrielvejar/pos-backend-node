
import pg from 'pg'
import * as dotenv from 'dotenv'
const { Client } = pg
dotenv.config()

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

export const connectDB = async () => {
  try {
    client.on('error', async () => {
      await client.connect()
    })
    const connection = await client.connect()
    console.log('Database connected! 🚀')
    return connection
  } catch (error) {
    throw new Error(error)
  }
}

export const disconnectDB = async () => {
  try {
    await client.end()
    console.log('Database disconnected!')
  } catch (error) {
    console.log(error)
    return { error }
  }
}

/**
 * @param {String} queryStream
 * @param {Array} values
 */
export const queryDB = async (queryStream, values) => {
  const res = await client.query(queryStream, values)
  return res
}
