/** @format */
require('dotenv').config()
const server = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./db/index')
const User = require('./db/models/users')
const balanceRouter = require('./routes/balance')
const userRouter = require('./routes/user')
const typeOperationsRouter = require('./routes/typeOperations')
const { initValues } = require('./db/models/typesOperation')

const PORT = process.env.PORT || '3002'

server.use(cors())
server.use(bodyParser.json())
server.use('/api/balance/', balanceRouter)
server.use('/api/typeOperations/', typeOperationsRouter)
server.use('/api/users/', userRouter)

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await initValues()
    console.log('Connected succesfully')
  } catch (e) {}
})

server.use((err, req, res, next) => {
  const status = err.code || 500
  res.status(status).json({ error: err.message })
})
