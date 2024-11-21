const mongoose = require("mongoose")
require('dotenv').config()

const dbConnect = async ()=>{
    try{
        const databaseConnection = mongoose.connect(process.env.DATABASE_URL)
        if (databaseConnection) {
            console.log("database connection sucessful");
        }
    }catch(error){
        console.log("from MongoDb Database connection error:",error);
    }
}

module.exports = {dbConnect}