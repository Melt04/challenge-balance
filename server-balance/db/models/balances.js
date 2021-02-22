/** @format */
const Sequelize = require('sequelize')
const db = require('../index')
const Category = require('./category')
const User = require('./users')
const { TypesOperation } = require('./typesOperation')

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
Balance.belongsTo(User)
/* Balance.hasOne(Category, {
  foreignKey: {
    allowNull: false,
  },
}) */
Balance.belongsTo(TypesOperation)
Balance.belongsTo(Category)
module.exports = Balance
