const userModel = require("../model/userSchema");
//  Signup Function where we will write logic of signup
const signup = async (req, resp, next) => {
  // destructuring json data
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  if(!name || !email || !password || !confirmPassword){
    return resp.status(400).json({
      success:false,
      message:"Every field is required"
    })
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
    if(e.code==11000){
      return resp.status(400).json({
        success:false,
        message: "Account already exist with provided email id"
      })
    }
    return resp.status(400).json({
      success: false,
      message: e.message
    })
  }
};

module.exports = {
  signup,
};
