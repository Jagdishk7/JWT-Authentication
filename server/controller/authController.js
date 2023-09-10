//  Signup Function where we will write logic of signup
const signup = (req,resp,next) => {

  // destructuring json data 
  const {name,email,password,confirmPassword} = req.body;
  console.log(name,email,password,confirmPassword)

  return resp.status(200).json({
    success:true,
    data:{Hello:"hello"}
  })
};

module.exports = {
  signup,
};
