/** @format */

const User = require('../../db/models/users')

const createUser = (user) => {
  return User.create(user)
}
const getAllUser = () => {
  return User.findAll()
}

const findUserByEmail = (email) => {
  return User.findOne({ where: { email } })
}
module.exports = { createUser, getAllUser, findUserByEmail }
