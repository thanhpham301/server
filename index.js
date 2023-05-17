import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";

import { client } from "./config/connectDB.js";
import { menu } from "./routes/menu.js";
import { ordered } from "./routes/orders.js";
import { getOrders } from "./routes/getorders.js";
const app = express();
const PORT = process.env.PORT;


async function main() {
    try{
        // connect to mongodb
        await client.connect()
        console.log("Connected to mongodb successfully");

        // set up middlewares
        app.use(express.json());
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static("public"));
        app.use("/api/v1/menu", menu)
        app.use("/api/v1/ordered", ordered)
        app.use("/api/v1/admin", getOrders)
        // run server
        app.listen(PORT, () => {
            console.log(
                `Sever is running on port ${PORT}`
            )
        })
    } catch (error) {
        console.log("connect failed")
    }
}


main()