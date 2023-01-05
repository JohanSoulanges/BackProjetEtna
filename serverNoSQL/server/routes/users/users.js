// Dependencies
const express = require("express");
const { checkToken, cleanToken, checkAdmin } = require("../middleware/jwt");
const jwt = require("jsonwebtoken");
const Users = require("../../Models/users.models");
const bcrypt = require("bcrypt");
const { updateOne } = require("../../Models/users.models");
const router = express.Router();

/* GET current users listing. */
router.get("/me", checkToken, function (req, res) {
  const token =
    req.headers.authorization &&
    jwt.decode(cleanToken(req.headers.authorization), process.env.SECRET);
  Users.findOne({ _id: token.id }).exec((err, user) => {
    if (err) {
      console.log("server log :" + err);
    }
    res.json(user);
  });
});

/* GET all users listing. */
router.get("/users", checkToken, function (req, res) {
  Users.find().exec((err, user) => {
    if (err) {
      console.log("server log :" + err);
    }
    res.json(user);
  });
});

/* GET specifique users listing. */
router.get("/user", checkAdmin, function (req, res) {
  Users.findOne({ _id: req.body.target }).exec((err, user) => {
    if (err) {
      console.log("server log :" + err);
    }
    res.json(user);
  });
});

/* PUT change a specifique users. */
router.put("/user", checkAdmin, function (req, res) {
  // console.log("first",req.body.params);

  Users.findOne({ _id: req.body.params.id }).exec((err, user) => {

    // check validité des données
    const userChange = {
      email:
        req.body.params.change.email != "" &&
        req.body.params.change.email != undefined &&
        req.body.params.change.email ? req.body.params.change.email : user.email,
      username:
        req.body.params.change.username != "" &&
        req.body.params.change.username != undefined &&
        req.body.params.change.username ? req.body.params.change.username : user.username,
      password:
        req.body.params.change.password != "" &&
        req.body.params.change.password != undefined &&
        bcrypt.hashSync(req.body.params.change.password, 8) ? bcrypt.hashSync(req.body.params.change.password, 8) : user.password,
      genre:
        req.body.params.change.genre != "" &&
        req.body.params.change.genre != undefined &&
        req.body.params.change.genre ? req.body.params.change.genre : user.genre,
      isAdmin:
        req.body.params.change.isAdmin != "" &&
        req.body.params.change.isAdmin != undefined &&
        req.body.params.change.isAdmin ? req.body.params.change.isAdmin : 0,
      adresse:
        req.body.params.change.adresse != undefined &&
        req.body.params.change.adresse != "" &&
        req.body.params.change.adresse ? req.body.params.change.adresse : user.adresse,
    };

    Users.updateOne(
      { _id: req.body.params.id },
      {
        $set: userChange,
      },
      { new: true },
      (err) => {
        console.log(1);
        if (err) {
          console.log(err);
          res.status(500).json("Erreur Edit Fail");
        } else {
          res.status(200).json("Edit Succes !");
        }
      }
    );
  });

});

/* DELETE a specifique users. */
router.delete("/delete", checkAdmin, function (req, res) {
  Users.findOneAndDelete({ _id: req.query.target }).exec((err, user) => {
    if (err) {
      res.status(500).json("erreur delete");
    } else {
      res.status(201).json("User deleted");
    }
  });
});

module.exports = router;
