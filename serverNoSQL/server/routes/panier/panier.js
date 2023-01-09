// Dependencies
const express = require("express");
const { checkToken, cleanToken } = require("../middleware/jwt");
const Panier = require("../../Models/panier.models");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Add panier
router.post("/add", checkToken, function (req, res) {
  console.log("panier add", req.body);

  const token =
    req.headers.authorization &&
    jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);

  Panier.findOne({ userId: token.id }).exec((err, panier) => {
    if (err) {
      console.log("server log :" + err);
    }
    if (panier && panier.status < 2) {
      const item = panier.products.find(
        (item) => item.productsId === req.body.productId
      );
      if (item) {
        item.quantity += 1;
        panier.save();
        return res.json(panier);
      }
      panier.products.push({
        productsId: req.body.productId,
        quantity: 1,
        price: req.body.price,
      });
      panier.save();
      return res.json(panier);
    } else {
      Panier.create({
        idUser: token.id,
        products: [
          {
            productsId: req.body.productId,
            quantity: 1,
            price: req.body.price,
          },
        ],
        date: Date.now(),
        status: 0,
      });
      return res.json(panier);
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

router.put("/validation", checkToken, function (req, res) {
  res.json({ message: "panier validation" });
});
module.exports = router;
