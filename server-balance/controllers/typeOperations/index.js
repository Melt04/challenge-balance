/** @format */

const { TypesOperation } = require('../../db/models/typesOperation')

const getAllTypeOperations = () => {
  return TypesOperation.findAll()
}

module.exports = { getAllTypeOperations }
