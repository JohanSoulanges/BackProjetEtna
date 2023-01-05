// Dependencies
const router = require('express').Router();

// Routes
const auth = require('./auth/auth');
const users = require('./users/users');
const products = require('./products/products');

// Initialize routes
router.use('/auth', auth);
router.use('/users', users);
router.use('/products', products);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello world' );
});

module.exports = router;
