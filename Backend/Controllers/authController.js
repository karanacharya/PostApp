const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../middleware/generateToken");



//Register route
module.exports.registerUser = async function (req, res) {
  try {
    const { fullname, username, email, password } = req.body;

    // Validation
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash  the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a  user
    const newUser = await userModel.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Generating token
    const token = generateToken(newUser);

    // Setting up cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    //response
    res.status(201).send(newUser)

  } catch (error) {
    console.error(error);    
    res.status(500).json({
      message: "Server error",
    });
  }
};

//Login route
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generating token
    const token = generateToken(user);

    // Setting up cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    //response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);    
    res.status(500).json({
      message: "Server error",
    });
  }
};

//profile route
module.exports.getProfile = async function(req , res){
   const user = req.user;

   res.status(200).json({
      user
   })
   
}


module.exports.logout = async function(req,res){
    res.cookie("token", "", {
        httpOnly: true,
        sameSite: "strict",
    });
    res.status(200).json({
        message: "Logout successful"
    });
}