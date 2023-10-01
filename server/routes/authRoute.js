const express = require('express');
const { signup } = require('../controller/authController');
const { signin } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post('/signup',signup)
authRouter.post('/signin',signin)

module.exports = authRouter;