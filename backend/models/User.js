const mongoose = require('mongoose');
const {Schema} =mongoose;

const UserSchema = new Schema({
    name:{
        type : String,
        required : true,
    },
    password:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    date:{
        type : Date,
        default : Date.now
    }
  });

//   The following statment were add by harry but i had not this works for non-repetation of email
//   const User =mongoose.model("user", UserSchema);
//   User.createIndexes();
//   module.exports=User

  module.exports=mongoose.model("user",UserSchema)