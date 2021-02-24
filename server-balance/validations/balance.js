/** @format */
const Validator = require('jsonschema').Validator
const balanceCreateSchema = {
  type: 'object',
  properties: {
    concepto: {
      type: 'string',
      required: true,
    },
    monto: {
      type: 'number',
      required: true,
    },
    fecha: {
      type: 'string',
      format: 'date',
    },
    typeOperationId: {
      type: 'number',
      required: true,
    },
    categoryId: {
      type: 'number',
      required: true,
    },
  },
  additionalProperties: false,
}
const balanceUpdateSchema = {
  type: 'object',
  properties: {
    concepto: {
      type: 'string',
    },
    monto: {
      type: 'number',
    },
    fecha: {
      type: 'string',
      format: 'date',
    },
  },
  additionalProperties: false,
}
function validateSchema(schema, schemaValidation) {
  const balanceValidator = new Validator()
  const result = balanceValidator.validate(schema, schemaValidation)

  return result.errors.map((error) => error.stack)
}
module.exports = { validateSchema, balanceCreateSchema, balanceUpdateSchema }
