const express = require('express')
const router = express.Router()

const { successMessage, errorMessage } = require('../db/responses')

const { makeEmojiObjs } = require('./constants')
const {getEmojis, getEmojiByUserId, editEmojiById, getEmojiById, generateEmojis, deleteEmojisByUserId} = require('../db/emojis')

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.json({
    "error":
    {
      "message": "auth failed"
    }
  })
}

//Get all Emojis (For Testing)
router.get('/', (req, res) => {
  getEmojis()
    .then(emojis => res.json({emojis}))
    .catch(err => res.status(500)
      .json(errorMessage('Could not get emojis'))
    )
})

//Get Emojis by UserID
router.get('/:id', ensureAuthenticated, (req, res) => {
  getEmojiByUserId(req.params.id[0])
    .then(emojis => res.json({emojis}))
    .catch(err => res.status(500)
      .json(errorMessage('Could not get emojis by id'))
    )
})

//Update Emojis by id
router.post('/edit/:id', ensureAuthenticated, (req, res) => {
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

//Post to generate emojis in intial positions
router.post('/', ensureAuthenticated, (req, res) => {
  makeEmojiObjs(req.user.id, function(emojis) {
    generateEmojis(emojis)
    .then(user => getEmojiByUserId(req.user.id)
    .then(emojis => res.json({emojis}))
    )
    .catch(error => console.log(error))
  })
})


//Post to delete the moved emojis from the db
router.post('/reset', ensureAuthenticated, (req, res) => {
  deleteEmojisByUserId(req.body.id)
  .then(response => res.status(201)
      .json(successMessage('Emojis Deleted'))
    )
    .catch(error => res.status(500)
      .json(errorMessage('Error deleting emojis'))
    )
})



module.exports = router
