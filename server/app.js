const express = require('express');
const app = express();

app.use('/',(req,resp)=>{
    resp.status(200).json({serverInfo:'JWT-Authentication'});
})


module.exports = app;