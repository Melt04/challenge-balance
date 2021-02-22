/** @format */
const Validator = require('jsonschema').Validator
const categoryCreateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
    },
    typeOperationId: {
      type: Number,
      required: true,
    },
  },
  additionalProperties: false,
}
function validatecategorySchema(schema) {
  const categoryValidator = new Validator()
  const result = categoryValidator.validate(schema, categoryCreateSchema)

  return result.errors.map((error) => error.stack)
}
module.exports = { validatecategorySchema }
