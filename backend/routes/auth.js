const express = require('express');
const passport = require('passport');

const router = express.Router();

/* AUTHENTICATE USER */

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }, () => {
    console.log('AAAAAAAAAAH', req.user);
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.post('/local', (req, res, next) => {
  res.json('NOT IMPLEMENTED LOCAL AUTHENTICATION');
});

module.exports = router;
