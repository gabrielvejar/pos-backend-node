// const { v4: uuidv4 } = require('uuid')
const { DataTypes } = require('sequelize')
const sequelize = require('../db').sequelize

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  cashier: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  sales: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  adminProducts: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  adminUsers: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  adminAdmins: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Role
