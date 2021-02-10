/** @format */

const Sequelize = require('sequelize')
const db = require('../index')
const Balance = require('./balances')
const TypesOperation = db.define('type_operation', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})
TypesOperation.hasOne(Balance, {
  foreignKey: {
    allowNull: false,
  },
})

async function initValues() {
  try {
    await TypesOperation.create({ name: 'egreso' })
    await TypesOperation.create({ name: 'ingreso' })
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { TypesOperation, initValues }
