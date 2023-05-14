import express from "express";
import { orderedDB } from "../config/connectDB.js";
export const ordered = express.Router();


ordered.post("/", async (req,res) => {
    try {
        const items = req.body
        console.log(items)
        let ordered;
        if(Array.isArray(items)) {
          ordered = await orderedDB.insertMany(items);
        } else {
          ordered = await orderedDB.insertOne(items);
        }
        
        if (!ordered.acknowledged) {
            throw new Error("Insert failed");
          }
          
          res.status(201).json({
            message: "Success",
            data: {
              ...ordered,
              _id: ordered.insertedId,
            },
          });
    } catch(e) {
        res.status(500).json({
            message: e.message,
            data: null
        })
    }
})