import dotenv from "dotenv";

dotenv.config();

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/characters";
export const JWT_SECRET = process.env.JWT_SECRET || "strawberry";
console.log("Environment variables are defined as");
console.log({ DB_CONNECTION_STRING, JWT_SECRET });
