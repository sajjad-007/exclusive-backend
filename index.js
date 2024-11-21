const {dbConnect} = require("./src/database/db")
const {app} = require("./app")
require('dotenv').config()


dbConnect().then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server is running on port 3000");
    })
})