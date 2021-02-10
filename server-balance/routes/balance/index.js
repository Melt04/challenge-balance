/** @format */

const express = require('express')
const router = express.Router()

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

router.post('/', async (req, res, next) => {
  const { balance } = req.body

  try {
    const validation = validateSchema(balance, balanceCreateSchema)
    if (validation.length > 0) {
      const error = new Error(`Errors in the request: ${validation} `)
      error.status = 400
      return next(error)
    }
    const newBalance = await createBalance(balance)
    if (!newBalance) {
      const error = new Error('Failed to create balance')
      error.status = 500
      return next(error)
    }
    res.send('ok')
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    return next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  const { balance } = req.body
  const validation = validateSchema(balance, balanceUpdateSchema)
  if (validation.length > 0) {
    const error = new Error(`Errors in the request: ${validation} `)
    error.status = 400
    return next(error)
  }

  try {
    const [updatedRecord] = await editBalance(id, balance)
    console.log(updatedRecord)
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
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedBalance = await deleteBalance(id)
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
