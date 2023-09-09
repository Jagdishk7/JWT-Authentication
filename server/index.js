const app = require('./app.js')
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});