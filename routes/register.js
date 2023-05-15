import express from "express";
import bcrypt from "bcrypt";
import { userCollection } from "../config/connectDB.js";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  try {
    // kiểm tra thông tin người dùng
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const userExists = await userCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = {
      username,
      email,
      password: hashed,
    };
    // save to DB
    const result = await userCollection.insertOne(newUser);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default registerRouter;
