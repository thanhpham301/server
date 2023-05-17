import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { client } from "./config/connectDB.js";
import { menu } from "./routes/menu.js";
import { ordered } from "./routes/orders.js";
import { updateOrderRouter } from "./routes/updateOrder.js";
import { getOrders } from "./routes/getorders.js";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
const app = express();
const PORT = process.env.PORT;

async function main() {
  try {
    // connect to mongodb
    await client.connect();
    console.log("Connected to mongodb successfully");

    // set up middlewares
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use("/api/v1/menu", menu);
    app.use("/api/v1/ordered", ordered);
    app.use("/api/v1/admin", getOrders);
    app.use("/api/v1/update-order", updateOrderRouter);
    app.use("/api/v1/login", loginRouter);
    app.use("/api/v1/register", registerRouter);

    // run server
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("connect failed");
  }
}

main();
