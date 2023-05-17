import express from "express";
import { orderedDB } from "../config/connectDB.js";

export const getOrders = express.Router();

getOrders.get("/", async (req, res) => {
  const getOrders = await orderedDB.find().toArray();
  res.status(200).json({
    message: "succeed",
    data: getOrders,
  });
});
