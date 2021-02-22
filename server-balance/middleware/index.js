/** @format */

const jwt = require('jsonwebtoken')
const User = require('../db/models/users')

function validateLoggedUser(token) {
  return jwt.verify(token, process.env.SECRET_PASSWORD)
}
async function validateLoggedMiddleware(req, res, next) {
  try {
    const headerToken = req.headers.authorization
    if (headerToken) {
      const token = headerToken.split(' ')[1]
      const decodedToken = validateLoggedUser(token)
      const user = await User.findOne({
        where: { email: decodedToken.email },
      })
      if (!user) {
        const error = new Error('You need to log in')
        error.codeStatus = 403
        return next(error)
      }
      req.email = decodedToken.email
      req.userId = user.id
      next()
    } else {
      const error = new Error('You need to log in')
      error.codeStatus = 403
      next(error)
    }
  } catch (e) {
    const error = new Error(e)
    next(error)
  }
}

module.exports = { validateLoggedMiddleware }
