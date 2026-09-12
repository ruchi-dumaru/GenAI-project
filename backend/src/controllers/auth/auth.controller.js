const userModel = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../../models/blacklist.model");
require("dotenv").config();

/**
 * @name registerUser
 * @param {username,email,password} req
 * @access public
 */

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email,password",
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User register succcessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 *
 *@des login a user expects email and password in req body
 * @access public
 */

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password ",
    });
  }

  let isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = await jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: user._id,
      userName: user.username,
      email: user.email,
    },
  });
}

/**
 *
 *@des clear token from user cookie and add to vlacklisting
 * @access public
 */

async function logoutUser(req, res) {
  const { token } = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({
      token,
    });
  }
  res.clearCookie("token");

  res.status(200).json({
    message: "User logout successfully",
  });
}

/**
 *
 *@des get current loggedIN user details
 * @access private
 */

async function getMe(req, res) {
  const id = req.user.id;
  const user = await userModel.findById(id);

 
  res.status(200).json({
    message: "User detail fetched succesfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
