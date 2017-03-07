const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

const getEmojis = () => knex('emojis')

const getEmojiById = (id) => knex('emojis').where('id', id)

const editEmojiById = (id, coords) => knex('emojis').where('id', id).update(coords)

const getEmojiByUserId = (userId) => knex('emojis').where('userId', userId)

const generateEmojis = (emojis) => knex('emojis').insert(emojis)

module.exports = {
  getEmojis,
  getEmojiById,
  editEmojiById,
  getEmojiByUserId,
  generateEmojis
}
