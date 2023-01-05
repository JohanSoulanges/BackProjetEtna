// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../Models/users.models");
const jwt = require("jsonwebtoken");
const { cleanToken } = require("../middleware/jwt");
const router = express.Router();

// Post register users route
router.post("/register", (req, res, next) => {
  console.log("Router register");

  // Constante NewUser
  const newUsers = new Users({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    genre: req.body.genre,
  });

  // Save NewUser
  Users.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      res.status(403).json("erreur Email Already Use");
    } else {
      newUsers.save((err) => {
        if (err) {
          res.status(500).json("erreur signup");
        } else {
          res.status(201).json("register OK !");
        }
      });
    }
  });
});

// Post login route
router.post("/login", (req, res, next) => {
  console.log("Router login");

  // Check if User exist
  Users.findOne({ email: req.body.email }).exec((err, user) => {
    // Check if User a set a good password
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // Create a token
      const token = jwt.sign(
        { id: user._id, username: user.username, admin: user.isAdmin },
        process.env.SECRET,
        {
          expiresIn: "1H",
        }
      );

      // Send a responce with Token
      res.status(200).json(token);
    } else {
      res.status(403).json("erreur login");
    }

    if (err) {
      console.log("server log :" + err);
    }
  });
});

// Post logout route
// router.delete("/logout", (req, res, next) => {
//   res.clearCookie("token");
//   res.end();
// });

// Get current user route
router.get("/current",async (req, res, next) => {
  console.log("Router current");
  const token = cleanToken(req.headers.authorization);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (decodedToken) {
        // Check if User exist and don't show the password
        const user = await Users.findById(decodedToken.id)
          .select("-password -__v")
          .exec();
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      } else {
        res.json(null);
      }
    } catch (e) {
      console.log(e);
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

module.exports = router;
