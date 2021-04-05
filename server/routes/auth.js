const express = require("express");
const router = express.Router();

const argon2 = require("argon2");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const verifyToken = require("./../middleware/auth");
//@route GET api/auth/register
//@desc check if user is logged in
//@access public

router.get('/',verifyToken, async(req,res)=>{
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) return res.status(400).json({ success: false, message: "User not found" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: "Internal, server error" });
  }
})



//@route POST api/auth/register
//@desc Register user with
//@access public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: `Missing username and/or password` });
  try {
    // check for existing user
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ success: false, message: "User name already existed" });

    //all good
    const hasedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hasedPassword,
    });
    await newUser.save();
    // return token
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ success: true, message: "User created successfully", accessToken });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: "Internal, server error" });
  }
});

//@route POST api/auth/register
//@desc Register user with
//@access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: `Missing username and/or password` });
  try {
    // check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ success: false, message: "Incorrect username or password" });

    //user name found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.status(400).json({ success: false, message: "Incorrect username or password" });
    //all good

     // return token
     const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
     return res.json({ success: true, message: "Logged in successfully", accessToken });

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: "Internal, server error" });
  
  }
});

module.exports = router;
