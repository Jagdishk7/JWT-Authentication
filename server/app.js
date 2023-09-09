const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute')

// by using /api/auth/ we can redirect all routes after this 
app.use('/api/auth/',authRouter)

// default route
app.use('/',(req,resp)=>{
    resp.status(200).json({serverInfo:'JWT-Authentication'});
})


module.exports = app;