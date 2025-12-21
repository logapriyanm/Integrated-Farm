import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginUser = async (req, res) => {
  try {
    console.log("🔥 LOGIN CONTROLLER HIT");

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }

    console.log("USER FOUND:", user.email, user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,      // 🔥 THIS IS THE KEY
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("JWT PAYLOAD:", {
      id: user._id.toString(),
      role: user.role,
      email: user.email
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Prevent registering with admin email
    if (email === process.env.ADMIN_EMAIL) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot register with admin email" 
      });
    }

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 6 characters" 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ 
      name, 
      email, 
      password: hashedPassword 
    });
    const user = await newUser.save();

    const token = createToken(user._id, user.role);

    res.json({ 
      success: true, 
      message: "User registered successfully", 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};



export { loginUser, registerUser };