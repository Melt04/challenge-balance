/** @format */

const Validator = require('jsonschema').Validator
const userCreateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: String,
      required: true,
      format: 'email',
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  additionalProperties: false,
}
function validateUserSchema(schema) {
  const balanceValidator = new Validator()
  const result = balanceValidator.validate(schema, userCreateSchema)
  console.log(result)
  return result.errors.map((error) => error.stack)
}
module.exports = { validateUserSchema }
