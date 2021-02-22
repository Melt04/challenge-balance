/** @format */

const express = require('express')
const router = express.Router()
const {
  createUser,
  getAllUser,
  findUserByEmail,
} = require('../../controllers/user')
const { validateUserSchema } = require('../../validations/user')
const { comparePassword, hashPassword, generateToken } = require('../../utils')

router.get('/', async (req, res) => {
  const users = await getAllUser()
  return res.status(200).json({ users })
})

router.post('/', async (req, res, next) => {
  const { user } = req.body

  try {
    const validation = validateUserSchema(user)
    if (validation.length > 0) {
      const error = new Error(`Errors in the request: ${validation} `)
      error.status = 400
      return next(error)
    }
    const password = await hashPassword(user.password)

    const result = await createUser({ ...user, password })
    if (result) {
      const token = generateToken({ email: user.email })
      return res
        .status(201)
        .json({ message: 'User created succsefully', token })
    }
  } catch (e) {
    next(e)
  }
})
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body.user
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(200).json({ message: 'No user found' })
    }
    const hash = user.password
    const result = await comparePassword(password, hash)
    if (result) {
      const token = generateToken({ email })
      res.status(200).json({ token })
    } else {
      res.send('Error')
    }
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    next(errro)
  }
})

module.exports = router
