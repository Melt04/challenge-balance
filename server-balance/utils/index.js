/** @format */
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const hashPassword = (password) => {
  const SALT = parseInt(process.env.SALT)
  return bcrypt.hash(password, SALT)
}

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.SECRET_PASSWORD)
}

const getDecodedToken = (token) => {
  if (jsonwebtoken.verify(token, process.env.SECRET_PASSWORD)) {
    const decodedToken = jsonwebtoken.decode(token)
    return decodedToken
  }
}
module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  getDecodedToken,
}
