import express from "express";
import { ObjectId } from "mongodb";

import { orderedDB } from "../config/connectDB.js";

export const updateOrderRouter = express.Router();

updateOrderRouter.patch("/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log("AAAAA", { completed: req.body.completed, id: orderId });

  const filter = { _id: new ObjectId(orderId) };

  const result = await orderedDB.findOneAndUpdate(
    filter,
    {
      $set: { completed: req.body.completed },
    },
    {
      returnOriginal: false,
    }
  );

  res.json({ success: true, data: result.value });
});
