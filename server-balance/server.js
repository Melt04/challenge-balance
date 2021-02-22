/** @format */
require('dotenv').config()
const server = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./db/index')
const Category = require('./db/models/category')
const Balance = require('./db/models/balances')
const User = require('./db/models/users')
const TypesOperation = require('./db/models/typesOperation')
const balanceRouter = require('./routes/balance')
const userRouter = require('./routes/user')
const typeOperationsRouter = require('./routes/typeOperations')
const categoryRouter = require('./routes/category')
const { initValues } = require('./db/models/typesOperation')

const PORT = process.env.PORT || '3002'

server.use(cors())
server.use(bodyParser.json())
server.use('/api/category/', categoryRouter)
server.use('/api/balance/', balanceRouter)
server.use('/api/users/', userRouter)
server.use('/api/typeOperations/', typeOperationsRouter)

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await initValues()
    console.log('Connected succesfully')
  } catch (e) {
    console.log(e)
  }
})

server.use((err, req, res, next) => {
  const status = err.code || 500
  res.status(status).json({ error: err.message })
})
