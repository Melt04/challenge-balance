/** @format */

const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize(
  `mysql://${process.env.USUARIO_BD}:${process.env.PASSWORD_BD}@localhost:${process.env.PUERTO_BD}/${process.env.NOMBRE_BD}`
)

module.exports = sequelize
