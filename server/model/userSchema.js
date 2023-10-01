const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,'user name is Required'],
        minLength: [5, 'Name must be atleast 5 char'],
        maxLength: [50, 'Name must be less than 50 char'],
        trim: true
    },
    email:{
        type: String,
        required: [true, "User email is required"],
        unique: true,
        lowercase:true,
        unique: [true, 'already registered']
    },
    password:{
        type:String,
        select: false
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiryDate:{
        type:Date,
    },
    
});

// here user is collection name in first argument which automatically becomes users after storing
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;