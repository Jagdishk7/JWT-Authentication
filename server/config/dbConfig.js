const  mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL

const dbconnect = ()=>{
    console.log(MONGODB_URL)
    mongoose.connect(MONGODB_URL)
    .then((conn)=> console.log(conn.connection.host))
    .catch((err)=> console.log(err.message));
}

module.exports = dbconnect;