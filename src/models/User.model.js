// EXTERNAL
// const { v4: uuidv4 } = require('uuid')
const { DataTypes } = require('sequelize')
const sequelize = require('../db').sequelize
// LOCAL
const Role = require('./Role.model')

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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

Role.hasMany(User, {
  foreignKey: {
    name: 'roleId',
    allowNull: false
  }
})

module.exports = User
