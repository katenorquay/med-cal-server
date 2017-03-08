const express = require('express')
const router = express.Router()

const Passport = require('passport')
const hasher = require('../auth/hasher')
const passport = require('../auth/passportSetup')

const { successMessage, errorMessage } = require('../db/responses')
const {getAllUsers, getUserByUsername, signupNewUser} = require('../db/users')
const { makeEmojiObjs } = require('./constants')
const { generateEmojis, getEmojiByUserId } = require('../db/emojis')

//Get all Users (For Testing)
router.get('/', (req, res) => {
  getAllUsers()
  .then(users => res.json({users}))
  .catch(err => console.log(err))
})

// POST to create a new user, and generate intial emojis
router.post('/signup', (req, res) => {
  getUserByUsername(req.body.username)
    .then(user => {
      if(user.length !== 0){
        throw new Error('This username is already taken')
      } else {
        hasher.hash(req.body.password, (hashedPassword) => {
          signupNewUser({
            username: req.body.username,
            password: hashedPassword
          })
          .then(response => res.status(201)
            .json(successMessage('User account created'))
          )
        })
      }
    })
    .catch(err => res.status(500)
      .json(errorMessage('there was an error creating this user'))
    )
})

//POST to login
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body.username)
  getUserByUsername(req.body.username)
    .then(user => res.json({ user: user[0]}))
    .catch(error => res.json(errorMessage('Error retrieving user from db')))
})

//GET to logout an user
router.get('/logout', (req, res) => {
  req.logOut()
  req.session.destroy(err => res.json(successMessage('User logged out')))
})

module.exports = router


// app/routes.js
//
// module.exports = function(app, passport) {
//
//     // route for home page
//     app.get('/', function(req, res) {
//         res.render('index.ejs'); // load the index.ejs file
//     });
//
//     // route for login form
//     // route for processing the login form
//     // route for signup form
//     // route for processing the signup form
//
//     // route for showing the profile page
//     app.get('/profile', isLoggedIn, function(req, res) {
//         res.render('profile.ejs', {
//             user : req.user // get the user out of session and pass to template
//         });
//     });
//
//     // =====================================
//     // FACEBOOK ROUTES =====================
//     // =====================================
//     // route for facebook authentication and login
//     app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//
//     // handle the callback after facebook has authenticated the user
//     app.get('/auth/facebook/callback',
//         passport.authenticate('facebook', {
//             successRedirect : '/profile',
//             failureRedirect : '/'
//         }));
//
//     // route for logging out
//     app.get('/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
//     });
//
// };
//
// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
