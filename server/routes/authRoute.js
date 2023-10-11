const express = require('express');
const { signUp,signIn,getUser } = require('../controller/authController');
// const { signIn } = require('../controller/authController');
const jwtAuth = require("../middleware/jwtAuth.js");


const authRouter = express.Router();

authRouter.post('/signup',signUp)
authRouter.post('/signin',signIn)
authRouter.get("/user", jwtAuth, getUser);

module.exports = authRouter;