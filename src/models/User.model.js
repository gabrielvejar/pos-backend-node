// const { v4: uuidv4 } = require('uuid')
const { DataTypes } = require('sequelize')
const sequelize = require('../db').sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  userName: {
    type: DataTypes.STRING
  }
})

module.exports = User
