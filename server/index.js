const app = require('./app.js')
const dotenv = require("dotenv")
dotenv.config() // now we can use dot env file
const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});