/** @format */
require('dotenv').config()
const server = require('express')()
const sequelize = require('./db/index')
const balanceRouter = require('./routes/balance')

const PORT = process.env.PORT || '3002'

server.use('/api/balance/', balanceRouter)
server.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected succesfully')
  } catch (e) {
    console.log(e.message)
  }
})
