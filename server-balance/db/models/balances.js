/** @format */
const Sequelize = require('sequelize')
const db = require('../index')

const Balance = db.define('balance', {
  concepto: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  monto: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW(),
  },
})

module.exports = Balance
