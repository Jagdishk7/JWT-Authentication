const  mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL

const dbconnect = ()=>{
    mongoose.connect(MONGODB_URL)
    .then((conn)=> console.log("Connected at : "+conn.connection.host))
    .catch((err)=> console.log(err.message));
}

module.exports = dbconnect;