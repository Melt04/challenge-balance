/** @format */

const express = require('express')
const router = express.Router()

const { validateLoggedMiddleware } = require('../../middleware')

const {
  validateSchema,
  balanceCreateSchema,
  balanceUpdateSchema,
} = require('../../validations/balance')

const {
  getAllbalances,
  editBalance,
  createBalance,
  deleteBalance,
  getBalanceById,
} = require('../../controllers/balance')

router.get('/', async (_, res, next) => {
  try {
    const balances = await getAllbalances()
    res.json(balances)
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    next(error)
  }
})
router.get('/balances', validateLoggedMiddleware, async (req, res) => {
  const { userId } = req
  const balance = await getBalanceById(userId)
  return res.status(200).json(balance)
})
router.post('/', validateLoggedMiddleware, async (req, res, next) => {
  const { balance } = req.body
  const { userId } = req
  try {
    const validation = validateSchema(balance, balanceCreateSchema)
    if (validation.length > 0) {
      const error = new Error(`Errors in the request: ${validation} `)
      error.status = 400
      return next(error)
    }
    const newBalance = await createBalance(balance, userId)

    if (!newBalance) {
      const error = new Error('Failed to create balance')
      error.status = 500
      return next(error)
    }
    res.json({ message: 'Balance created' })
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    return next(error)
  }
})

router.patch('/:id', validateLoggedMiddleware, async (req, res, next) => {
  const { id } = req.params
  const { balance } = req.body
  const { userId } = req
  const validation = validateSchema(balance, balanceUpdateSchema)
  if (validation.length > 0) {
    const error = new Error(`Errors in the request: ${validation} `)
    error.status = 400
    return next(error)
  }

  try {
    const [updatedRecord] = await editBalance(id, balance, userId)

    if (updatedRecord === 0) {
      return res.json({ message: 'No record founded with the id provided' })
    }
    return res.status(200).json({ message: 'Update succesfully' })
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    next(error)
  }
})
router.delete('/:id', validateLoggedMiddleware, async (req, res, next) => {
  const { id } = req.params
  const { userId } = req

  try {
    const deletedBalance = await deleteBalance(id, userId)
    if (deletedBalance === 0) {
      return res.json({ message: 'No record founded with the id provided' })
    }
    res.json({ message: 'Ok' })
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    next(error)
  }
})

module.exports = router
