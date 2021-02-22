/** @format */

const Sequelize = require('sequelize')
const db = require('../index')

const TypesOperation = db.define('type_operation', {
  name: {
    type: Sequelize.TEXT,
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
/* TypesOperation.hasOne(Balance, {
  foreignKey: {
    allowNull: false,
  },
}) */
/* TypesOperation.hasOne(Category, {
  foreignKey: {
    allowNull: false,
  },
}) */

module.exports = { TypesOperation, initValues }
