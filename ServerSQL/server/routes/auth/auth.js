// Dependencies
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource auth');
});

module.exports = router;