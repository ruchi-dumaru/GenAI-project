const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
require("dotenv").config();

async function authUser(req, res, next) {
  const token= req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Token not provided",
    });
  }

 const blackListToken= await tokenBlacklistModel.findOne({token})

 if(blackListToken){
  return res.status(401).json({
    message:"User already loggout.LogIN again!"
  })
 }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports={authUser};