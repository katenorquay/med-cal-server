const express = require('express')
const router = express.Router()
const { successMessage, errorMessage } = require('../db/responses')
const { makeEmojiObjs } = require('./constants')
const {getEmojis, getEmojiByUserId, editEmojiById, getEmojiById, generateEmojis, deleteEmojisByUserId} = require('../db/emojis')

//Get all Emojis (For Testing)
router.get('/', (req, res) => {
  getEmojis()
  .then(emojis => res.json({emojis}))
  .catch(err => res.status(500)
    .json(errorMessage('Could not get emojis'))
  )
})

//Get Emojis by UserID
router.get('/:id', (req, res) => {
  var userId = req.params.id
  getEmojiByUserId(userId)
  .then(emojis => res.json({emojis}))
  .catch(err => res.status(500)
    .json(errorMessage('Could not get emojis by id'))
  )
})

//Update Emojis by id to
router.post('/edit/:id', (req, res) => {
    var newCoords = {
      x: req.body.x,
      y: req.body.y,
    }
    editEmojiById(req.params.id, newCoords)
      .then(emoji => getEmojiById(req.params.id))
      .then(emoji => res.status(201)
        .json({success: 'Update was successful', emoji: emoji[0]})
      )
      .catch(error => res.status(500)
        .json(errorMessage('Error updating emoji coords'))
    )
  })

  router.post('/reset', (req, res) => {
    deleteEmojisByUserId(req.body.id)
    .then(user => makeEmojiObjs(req.body.id, function(emojis) {
      generateEmojis(emojis)
      .then(user => getEmojiByUserId(req.body.id)
      .then(emojis => res.json({emojis}))
      )
    }))
    .catch(error => res.status(500)
      .json(errorMessage('Error deleting emojis'))
    )
  })



module.exports = router
