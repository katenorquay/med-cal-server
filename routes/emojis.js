const express = require('express')
const router = express.Router()
const { successMessage, errorMessage } = require('../db/responses')

router.get('/', (req, res) => {
  getEmojis()
  .then(emojis => res.json({emojis}))
  .catch(err => res.status(500)
    .json(errorMessage('Could not get emojis'))
  )
})

//Get Emojis by UserID
router.get('/', (req, res) => {
  var userId = req.body.currentUser
  getEmojiByUserId(userId)
  .then(emojis => res.json({emojis}))
  .catch(err => res.status(500)
    .json(errorMessage('Could not get emojis by id'))
  )
})

//Update Emojis by id
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
})
