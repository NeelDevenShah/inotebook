const express =require("express");
const { default: mongoose } = require("mongoose");
const router =express.Router();
const User=require("../models/User")

//Create a user using : POST "/api/auth/". Doesn't require Auth
//Here there are two options the router.get and the router.post
router.post("/", (req,res)=>{
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
})

module.exports=router