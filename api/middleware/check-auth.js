const jwt = require("jsonwebtoken");
const user = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    console.log(decode);
   
    next();
  } catch (error) {
    res.status(401).json({
      error: "Not Authorised",
    });
  }
};
