const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");
//  Signup Function where we will write logic of signup
const signup = async (req, resp, next) => {
  // destructuring json data
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  // controller level validation of data
  if (!name || !email || !password || !confirmPassword) {
    return resp.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  const validEmail = emailValidator.validate(email);

  if (!validEmail) {
    return resp.status(400).json({
      success: false,
      message: "Enter a valid email",
    });
  }
  if (password != confirmPassword) {
    return resp.status(400).json({
      success: false,
      message: "Password didn't matched",
    });
  }

  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    return resp.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    // 11000 means duplicate entry
    if (e.code == 11000) {
      return resp.status(400).json({
        success: false,
        message: "Account already exist with provided email id",
      });
    }
    return resp.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const signin = async (req, resp, next) => {
  const {email,password } = req.body;
  if (!email || !password) {
    return resp.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password"); // this will select password field from this object

  if(!user || user.password !== password){
    return resp.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  return resp.status(200).json({
    success: true,
    message: "Sign in successful"
  })
};

module.exports = {
  signup,
  signin,
};
