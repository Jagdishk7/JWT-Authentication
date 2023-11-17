const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const dbconnect = require('./config/dbConfig');
const cookieParser = require('cookie-parser');

dbconnect();

// to parse the json data from every request ( batayega ki ye req data json type hai)
app.use(express.json())
app.use(cookieParser()); // Third-party middleware

// by using /api/auth/ we can redirect all routes after this 
app.use('/api/auth/',authRouter)

// default route
app.use('/',(req,resp)=>{
    resp.status(200).json({serverInfo:'JWT-Authentication'});
})


module.exports = app;