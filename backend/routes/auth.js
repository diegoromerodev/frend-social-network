const express = require('express');
const { facebook_auth, local_auth } = require('../controllers/auth');

const router = express.Router();

/* AUTHENTICATE USER */

router.post('/facebook', facebook_auth);

router.post('/local', local_auth);

module.exports = router;
