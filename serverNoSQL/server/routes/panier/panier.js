// Dependencies
const express = require("express");
const { checkToken, cleanToken } = require("../middleware/jwt");
const Panier = require("../../Models/panier.models");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Add panier
router.post("/add", checkToken, function (req, res) {
  const token =
    req.headers.authorization &&
    jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);

  const newPanier = {
    userId: token.id,
    productsId: req.body.productsId,
    quantité: 1,
    date: new Date.now(),
  };

  Panier.findOne({ userId: token.id }).exec((err, panier) => {
    if (err) {
      console.log("server log :" + err);
    }
    if (panier && panier.status < 2) {
      panier.forEach((item) => {
        if (item.productsId === newPanier.productsId) {
          item.quantité += 1;
          item.date = new Date.now();
        }
        panier.save();
        res.json(panier);
      });
      panier.push({ ...newPanier }, { status: 0 });
      panier.save();
      res.json(panier);
    } else {
      panier.push({ newPanier }, { status: 0 });
      panier.save();
      res.json(newPanier);
    }
  });
});

router.get("/", checkToken, function (req, res) {

  const token =
    req.headers.authorization &&
    jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);
    
  Panier.findOne({ userId: token.id }).exec((err, panier) => {
    if (err) {
      console.log("server log :" + err);
    }
    res.json(panier);
  });
});
module.exports = router;
