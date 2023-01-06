// Dependencies
const router = require("express").Router();

// Routes
const auth = require("./auth/auth");
const users = require("./users/users");
const products = require("./products/products");
const panier = require("./panier/panier");

// Initialize routes
router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);
router.use("/panier", panier);


/* GET home page. */
// router.get("*", function (req, res, next) {
//   res.redirect("/");
// });

module.exports = router;
