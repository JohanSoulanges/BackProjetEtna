// Dependencies
const express = require("express");
const { checkToken, cleanToken } = require("../middleware/jwt");
const Users = require("../../Models/users.models");
const Products = require("../../Models/products.models");
const jwt = require("jsonwebtoken");
const router = express.Router();

/* GET Create products. */
router.post("/create", checkToken, function (req, res, next) {
  console.log("Router create");

  const token =
    req.headers.authorization &&
    jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);

  // Constante NewProduct
  const newProduct = new Products({
    name: req.body.name,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    userId: token.id,
    venteNb: req.body.venteNb,
    ajoutePn: req.body.ajoutePn,
    detailCheck: req.body.detailCheck,
    category: [req.body.name.toLowerCase(), req.body.category],
  });

  // Save NewUser
  Users.findOne({ _id: token.id }).exec((err, user) => {
    if (!user) {
      res.status(403).json("erreur User do not exist");
    } else {
      newProduct.save((err) => {
        if (err) {
          res.status(500).json("erreur create");
        } else {
          res.status(201).json("create OK !");
        }
      });
    }
  });
});

// Get One Product
router.get("/", function (req, res, next) {
  console.log("Router get");

  Products.findOne({ _id: req.query.id }).exec((err, product) => {
    if (!product) {
      res.status(403).json("erreur Product do not exist");
    } else {
      res.status(201).json(product);
    }
  });
});

// Modify product
router.put("/", checkToken, function (req, res, next) {
  console.log("Router change");

  Products.findOneAndUpdate(
    { _id: req.body.target },
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: [req.body.name.toLowerCase(), req.body.category],
      // img: req.body.img, // for later
    },
    { new: true },
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).json("Erreur Edit Fail");
      } else {
        res.status(200).json("Edit Succes !");
      }
    }
  );
});

// Delete a product
router.delete("/", checkToken, function (req, res, next) {
  console.log("Router delete");

  console.log(req.query);

  Products.findOneAndDelete({ _id: req.query.id }).exec((err, product) => {
    if (!product) {
      res.status(403).json("erreur Product do not exist");
    } else {
      res.status(201).json("product deleted");
    }
  });
});

// Get all products
router.get("/all", function (req, res, next) {
  console.log("Router get all");

  Products.find().exec((err, products) => {
    if (!products) {
      res.status(403).json("erreur Product do not exist");
    } else {
      res.status(201).json(products);
    }
  });
});

// Get all products from a user
router.get("/all/id", checkToken, function (req, res, next) {
  console.log("Router get all");

  if (!req.params.id) {
    const token =
      req.headers.authorization &&
      jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);
  
    Products.find({ userId: token.id }).exec((err, products) => {
      if (!products) {
        res.status(403).json("erreur Product do not exist");
      } else {
        res.status(201).json(products);
      }
    });
  } else {
    Products.find({ userId: req.query.id }).exec((err, products) => {
      if (!products) {
        res.status(403).json("erreur Product do not exist");
      } else {
        res.status(201).json(products);
      }
    });
  }

});

// Get Best Vente
router.get("/best", function (req, res) {
  console.log("Router get best");

  Products.find()
    .sort({ venteNb: -1 })
    .limit(2)
    .exec((err, products) => {
      if (!products) {
        res.status(403).json("erreur Product do not exist");
      } else {
        res.status(201).json(products);
      }
    });
});

//  Get Last Products Added
router.get("/last", function (req, res) {
  console.log("Router get last");

  Products.find()
    .sort({ date: -1 })
    .limit(3)
    .exec((err, products) => {
      if (!products) {
        res.status(403).json("erreur Product do not exist");
      } else {
        res.status(201).json(products);
      }
    });
});

// Get Products by category
router.get("/category", function (req, res) {
  console.log("Router get category");

  Products.find({ category: req.query.filter }).exec((err, products) => {
    if (!products) {
      res.status(403).json("erreur Category do not exist or no products in it");
    } else {
      res.status(201).json(products);
    }
  });
});
module.exports = router;
