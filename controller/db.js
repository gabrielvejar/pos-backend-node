
const { Client } = require('pg')
const client = new Client()

const conectDB = async () => {
  try {
    await client.connect()
    console.log('Database conected!')
  } catch (error) {
    console.log(error)
    return { error }
  }
}

const disconectDB = async () => {
  try {
    await client.end()
    console.log('Database disconected!')
  } catch (error) {
    console.log(error)
    return { error }
  }
}

/**
 * @param {String} queryStream
 * @param {Array} values
 */
const queryDB = async (queryStream, values) => {
  try {
    const res = await client.query(queryStream, values)
    console.log({ res })
    return res
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

module.exports = { conectDB, disconectDB, queryDB }
