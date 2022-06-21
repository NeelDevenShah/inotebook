const express =require("express");
const { default: mongoose } = require("mongoose");
const router =express.Router();
const User=require("../models/User")
const {body, validationResult} =require('express-validator');
const bcrypt = require('bcrypt');
const JWT_SECRET ="NeelIsGoodBoy"
var jwt = require('jsonwebtoken');

//Create a user using : POST "/api/auth/". No end point required
//Here there are two options the router.get and the router.post
router.post("/createuser", [
    body('email', 'Enter the right email').isEmail(),
    body('name', 'Enter the right name').isLength({ min :5}),
    body('password', 'Enter the right password').isLength({ min: 5 }),
], async (req,res)=>{
  //If there are errors than return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check wheather the user with this email exists already
    let user= await User.findOne({email: req.body.email});
    try{
    if(user){
      return res.status(400).json({error: "sorry a user with this email already exists"})
    }
    const salt =await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);

    //Create a user
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      const data={
        user:{
          id: user.id,
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      res.json({authtoken})
    }
      catch(error){
          console.error(error.message);
          res.status(500).send("Some Error Occured");
      }
    })

module.exports=router