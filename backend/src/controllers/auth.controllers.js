const userModel = require("./../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel=require("../models/blacklist.model")
const redis=require("../config/cache")
async function register(req, res) {
  const { username, email, password } = req.body;
  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "username or email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username: user.username, 
        email: user.email,
    },
  });
}

async function login(req, res) {
  const {username, email, password } = req.body;
    const user = await userModel.findOne({ $or: [{ username }, { email }] }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      res.cookie("token", token);
      res.status(200).json({
        message: "login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
}


async function getMe(req,res) {

  const user=await userModel.findById(req.user.id)

  res.status(200).json({
    message:"user fetched succssfully",
    user
  })
  
}


async function logoutUser(req, res) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "No token found"
    });
  }

  res.clearCookie("token");

  await redis.set(token,Date.now().toString())

  res.status(200).json({
    message: "Logout successfully"
  });
}

module.exports = { register, login,getMe,logoutUser };
