/** @format */

const express = require('express')
const router = express.Router()
const {
  createUser,
  getAllUser,
  findUserByEmail,
} = require('../../controllers/user')

const { comparePassword, hashPassword } = require('../../utils')

router.get('/', async (req, res) => {
  const users = await getAllUser()

  return res.status(200).json({ users })
})

router.post('/', async (req, res, next) => {
  const { user } = req.body
  try {
    const password = await hashPassword(user.password)

    const result = await createUser({ ...user, password })
    if (result) {
      return res.status(201).json({ message: 'User created succsefully' })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body.user
  console.log(email)
  const user = await findUserByEmail(email)
  if (!user) {
    console.log('NOT FOUND')
    return res.status(200).json({ message: 'No user found' })
  }

  const hash = user.password
  const result = await comparePassword(password, hash)
  if (result) {
    res.send('HI')
  } else {
    res.send('Error')
  }
})

module.exports = router
