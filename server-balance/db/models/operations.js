/** @format */
const Sequelize = require('sequelize')
const db = require('../index')

const Operation = db.define('operations', {
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
    allowNull: false,
  },
})
Operation.sync({ force: true })
module.exports = Operation
