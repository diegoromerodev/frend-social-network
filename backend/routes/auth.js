const express = require('express');
const passport = require('passport');

const router = express.Router();

/* AUTHENTICATE USER */

router.get('/', passport.authenticate('facebook'));

router.get('/callback', (req, res, next) => {
  res.json('NOT IMPLEMENTED FACEBOOK CALLBACK');
});

router.post('/local', (req, res, next) => {
  res.json('NOT IMPLEMENTED LOCAL AUTHENTICATION');
});

module.exports = router;
