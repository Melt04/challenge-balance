/** @format */

const express = require('express')
const router = express.Router()
const { getAllTypeOperations } = require('../../controllers/typeOperations')

router.use('/', async (req, res, next) => {
  try {
    const typeOperations = await getAllTypeOperations()

    res.json(typeOperations)
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    next(error)
  }
})
module.exports = router
