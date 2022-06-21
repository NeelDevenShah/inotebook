const mongoose =require("mongoose");
const mongoUri=("mongodb://localhost:27017/inotebook");

const connectToMongo=()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to mongoDB");
    })
}

module.exports=connectToMongo;