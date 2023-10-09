const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is Required"],
      minLength: [5, "Name must be atleast 5 char"],
      maxLength: [50, "Name must be less than 50 char"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
    },
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// FIXME: Check if these methods are working as expected
// we can create custom methods using mongodb
userSchema.methods = {
    //method for generating the jwt token
    jwtToken() {
      //jwt.sign has three arguments 1st is data
      return JWT.sign(
        // 1st data
        { id: this._id, email: this.email },
        //2nd secret key
        process.env.SECRET,
        { expiresIn: '24h' } // time limit
      );
    }
}

// here user is collection name in first argument which automatically becomes users after storing
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
