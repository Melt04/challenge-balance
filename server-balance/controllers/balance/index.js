/** @format */
const Balance = require('../../db/models/balances')

const getAllbalances = () => {
  return Balance.findAll()
}
const createBalance = (balance) => {
  return Balance.create(balance)
}

const editBalance = (id, balance) => {
  return Balance.update(balance, {
    where: {
      id: id,
    },
  })
}
const deleteBalance = (id) => {
  return Balance.destroy({ where: { id: id } })
}
module.exports = { getAllbalances, createBalance, editBalance, deleteBalance }
