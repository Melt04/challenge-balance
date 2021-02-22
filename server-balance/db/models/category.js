/** @format */
const Sequelize = require('sequelize')
const db = require('../index')
const { TypesOperation } = require('./typesOperation')

const Category = db.define('category', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})
Category.belongsTo(TypesOperation)
module.exports = Category
