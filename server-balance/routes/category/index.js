/** @format */

const express = require('express')
const router = express.Router()
const { createCategory, getCategories } = require('../../controllers/category')
const { validatecategorySchema } = require('../../validations/category')
router.get('/', async (req, res, next) => {
  try {
    const categories = await getCategories()
    return res.status(200).json(categories)
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    return next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { category } = req.body
  const validation = validatecategorySchema(category)
  if (validation.length > 0) {
    const error = new Error(`Errors in the request: ${validation} `)
    error.status = 400
    return next(error)
  }

  try {
    const cat = await createCategory(category)
    if (!cat) {
      const error = new Error(e.message)
      error.status = 500
      next(error)
    }
    return res.status(201).json({ message: 'Created succesfully' })
  } catch (e) {
    const error = new Error(e.message)
    error.status = 500
    return next(error)
  }
})

module.exports = router
