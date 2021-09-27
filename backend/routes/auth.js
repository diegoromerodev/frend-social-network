const express = require('express');

const router = express.Router();

/* AUTHENTICATE USER */

router.post('/', (req, res, next) => {
  res.json('NOT IMPLEMENTED AUTHENTICATE USER');
});

module.exports = router;
