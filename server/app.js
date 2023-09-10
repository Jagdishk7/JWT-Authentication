const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute')

// to parse the json data from every request ( batayega ki ye req data json type hai)
app.use(express.json())

// by using /api/auth/ we can redirect all routes after this 
app.use('/api/auth/',authRouter)

// default route
app.use('/',(req,resp)=>{
    resp.status(200).json({serverInfo:'JWT-Authentication'});
})


module.exports = app;