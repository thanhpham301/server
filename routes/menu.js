import express from "express";
import { menuDB } from "../config/connectDB.js";

export const menu = express.Router();

menu.get("/", async (req,res) => {
    const menu = await menuDB.find().toArray();
    res.status(200).json({
        message: "succeed",
        data: menu
    })
})