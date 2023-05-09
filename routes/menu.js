import express from "express";

export const menu = express.Router();

menu.get("/", (req,res) => {
    res.status(200).json({
        message: "succeed",

    })
})