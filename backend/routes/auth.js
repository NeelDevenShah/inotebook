const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT_SECRET = "NeelIsGoodBoy"
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const { useState } = require("react");
// const [success, setSuccess]=useState("fail");

//ROUTE 1: Create a user using : POST "/api/auth/createuser". No end point required
//Here there are two options the router.get and the router.post
router.post("/createuser", [
  body('email', 'Enter the right email').isEmail(),
  body('name', 'Enter the right name').isLength({ min: 5 }),
  body('password', 'Enter the right password').isLength({ min: 5 }),
], async (req, res) => {
  //If there are errors than return bad request and errors
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({success ,errors: errors.array() });
  }
  //Check wheather the user with this email exists already
  let user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      success=false;
      return res.status(400).json({success, error: "sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Create a user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user.id,
      }
    }
    success=true;
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success, authtoken })
  }
  catch (error) {
    success=false;
    console.error(error.message);
    res.status(500).send(success, "Internal server error occured");
  }
})

//ROUTE 2: Authenticate a user using: POST "/api/auth/login". No end point required
router.post("/login", [
  body("email", "Enter the right email").isEmail(),
  body("password", "Enter the password it cannot be blank").exists(),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    //If errors than return bad request and error
    success=false;
    return res.status(400).json({success, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false;
      return res.status(400).json({success, error: "Wrong crediantials entered, try again" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({success, error: "Please try to login with correct credentials" })
    }
    const data = {
      user: {
        id: user.id,
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // setSuccess("true");
    let success=true;
    res.json({success, authtoken})
  }
  catch (error) {
    const success="fail";
    console.error(error.message);
    res.status(500).send(success, "Internal server error occured");
  }

})

//Route 3 : Get loggedin user details using : POST "api/auth/getuser". Login required
  router.post("/getuser", fetchuser, async (req, res)=>{

try{
  userId =req.user.id;
  const user =await User.findById(userId).select("-password");
  res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router