import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userCollection } from "../config/connectDB.js";
import authMiddleware from "../middlewares/authmiddle.js";

const loginRouter = express.Router();

// Login route
loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });
    console.log(password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({ message: "Login success", user: user, jwt: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected route
loginRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userCollection.findOne({ email: req.jwt.email });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default loginRouter;
