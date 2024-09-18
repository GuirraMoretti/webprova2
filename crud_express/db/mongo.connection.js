var mongoose = require("mongoose")

var mongoDB_URI = "mongodb+srv://ashiley:12345@cluster0.urmce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoDB_URI, {useNewUrlParser:true})

var db = mongoose.connection

db.on("connected",
    () => {
        console.log('Mongoose Connected to ' +mongoDB_URI)
    }


)

db.on("disconnected",
    (error) => {
        console.log('Mongoose Error ' + error)
    }


)