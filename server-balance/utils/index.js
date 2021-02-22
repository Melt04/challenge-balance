/** @format */
const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const SALT = parseInt(process.env.SALT)
  return bcrypt.hash(password, SALT)
}

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = { hashPassword, comparePassword }
