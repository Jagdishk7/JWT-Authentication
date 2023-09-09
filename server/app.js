const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute')

app.use('/api/auth/',authRouter)

app.use('/',(req,resp)=>{
    resp.status(200).json({serverInfo:'JWT-Authentication'});
})


module.exports = app;