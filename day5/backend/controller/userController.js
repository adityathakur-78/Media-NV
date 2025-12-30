import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User Already Exist", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created Successfully",
      success: true,
      user: userModel,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Sever Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errMessage = "Auth Failed  or password is wrong";
    if (!user) {
      return res.status(401).json({ message: errMessage, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: errMessage, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "User Login Successfully",
      success: true,
      token: jwtToken,
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Sever Error", success: false });
  }
};
