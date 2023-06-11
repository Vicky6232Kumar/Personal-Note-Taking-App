const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.DB_URL;

const connectToMongo = () =>{
    mongoose.connect(mongoURI, () =>{
        console.log("Connect to mongo successfully")
    })
}

module.exports = connectToMongo;