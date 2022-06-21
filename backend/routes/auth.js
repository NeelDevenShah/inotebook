const express =require("express");
const { default: mongoose } = require("mongoose");
const router =express.Router();
const User=require("../models/User")
const {body, validationResult} =require('express-validator');

//Create a user using : POST "/api/auth/". Doesn't require Auth
//Here there are two options the router.get and the router.post
router.post("/", [
    body('email', 'Enter the right email').isEmail(),
    body('name', 'Enter the right name').isLength({ min :5}),
    body('password', 'Enter the right password').isLength({ min: 5 }),
], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
      res.json({error: "please enter a unique value for email", message: err.message})});
})

module.exports=router