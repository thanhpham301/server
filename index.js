// import { config } from "dotenv";
// config();
import express from "express";
import { menu } from "./routes/menu.js";
const app = express();
// const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/v1/menu", menu)

app.listen("8080", () => {
    console.log(
        `Sever is running on port 8080`
    )
})