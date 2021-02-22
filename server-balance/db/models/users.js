/** @format */
const Sequelize = require('sequelize')
const db = require('../index')
const Balance = require('./balances')
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
User.hasOne(Balance, {
  foreignKey: {
    allowNull: false,
  },
})
module.exports = User
