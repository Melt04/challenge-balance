/** @format */

const Category = require('../../db/models/category')

const createCategory = (category) => {
  return Category.create(category)
}
const getCategories = (type) => {
  return Category.findAll({})
}

module.exports = { createCategory, getCategories }
