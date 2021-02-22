/** @format */
const Balance = require('../../db/models/balances')
const { findUserByEmail } = require('../user')
const { getDecodedToken } = require('../../utils')
const getAllbalances = () => {
  return Balance.findAll()
}
const createBalance = async (balance, id) => {
  return Balance.create({ ...balance, userId: id })
}
const getBalanceById = async (id) => {
  return Balance.findAll({
    where: {
      userId: id,
    },
  })
}
const editBalance = (id, balance, userId) => {
  return Balance.update(balance, {
    where: {
      id: id,
      userId,
    },
  })
}
const deleteBalance = async (id, userId) => {
  return Balance.destroy({ where: { id: id, userId } })
}
module.exports = {
  getAllbalances,
  createBalance,
  editBalance,
  deleteBalance,
  getBalanceById,
}
