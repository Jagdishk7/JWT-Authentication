const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");
//  Signup Function where we will write logic of signup
const signUp = async (req, resp, next) => {
  // destructuring json data
  const { name, email, password, confirmPassword } = req.body;

  // controller level validation of data
  if (!name || !email || !password || !confirmPassword) {
    return resp.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

    //validate email using "email-validator" package
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



const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // send response with error message if email or password is missing
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required"
    });
  }

  try {
    // check user exist or not
    const user = await userModel
      .findOne({
        email
      })
      .select("+password");

    // If user is null or the password is incorrect return response with error message
    if (!user || user.password !== password) {
      return res.status(400).json({
        success: true,
        message: "invalid credentials"
      });
    }

    // Create jwt token using userSchema method( jwtToken() )
    const token = user.jwtToken();
    user.password = undefined; // to prevent password leakage

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000, //24hr
      httpOnly: true // by using this user is not able to modify  the cookie in client side
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  signUp,
  signIn
};
