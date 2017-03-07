const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

const getAllUsers = () => knex('users')

const signupNewUser = (userInfo) => knex('users').insert(userInfo)

const getUserByUsername = (username) => knex('users').where('username', username)

const getUserById = (id) => knex('users').where('id', id)

module.exports = {
  getAllUsers,
  signupNewUser,
  getUserByUsername,
  getUserById
}
