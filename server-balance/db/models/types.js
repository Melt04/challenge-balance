/** @format */

const Sequelize = require('sequelize')
const db = require('../index')
const Operation = require('./operations')
const Types = db.define('type', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

Types.hasOne(Operation)
Types.sync({ force: true })
module.exports = Types
