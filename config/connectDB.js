import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

export const client = new MongoClient(process.env.MONGO_DB_URL);

export const menuDB = client.db("order-app").collection("menu");
export const orderedDB = client.db("order-app").collection("orders");