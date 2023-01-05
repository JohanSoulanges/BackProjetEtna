// Dependencies
const jwt = require("jsonwebtoken");

// Clean up token
const cleanToken = (headerValue) => {
  // Check if the value is a string
  if (typeof headerValue !== "string") {
    console.log("ok");
    return false;
  }

  // Split Bearer from token
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches[2];
};

// Refresh token
const refreshToken = (token) => {
  return jwt.sign(
    { id: token.id, username: token.username },
    process.env.SECRET,
    { expiresIn: "1H" }
  );
};

// Check if user is logged in
const checkToken = (req, res, next) => {
  const token =
    req.headers.authorization && cleanToken(req.headers.authorization);
  //   check if token is not empty
  if (!token) {
    return res.status(401).json("No token provided");
  }
  //   check if token is valid
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // console.log(decoded);
    // if (decoded.exp < Date.now()- 1000000 ) {
    //   refreshToken(decoded);
    //   next();
    // }
    if (err) {
      return res.status(401).json("Failed to authenticate token");
    }
    next();
  });
};

// Check if user is admin and token 
const checkAdmin = (req, res, next) => {
  const token =
    req.headers.authorization && cleanToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log(decoded.admin);
    if (!decoded.admin) {
      return res.status(403).json(`You don't have access`);
    }
    if (err) {
      return res.status(401).json("Failed to authenticate token");
    }
    next();
  });
};

module.exports = { checkToken, cleanToken, checkAdmin };
