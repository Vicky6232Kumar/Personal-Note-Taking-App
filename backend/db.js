const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://notebook:inotebook@cluster0.4ecbxde.mongodb.net/user?retryWrites=true&w=majority`

const connectToMongo = () =>{
    mongoose.connect(mongoURI, () =>{
        console.log("Connect to mongo successfully")
    })
}

module.exports = connectToMongo;