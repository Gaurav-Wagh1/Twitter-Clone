import express from "express";
import connect from "./config/database.js";
const app = express();

app.listen(3000, async () => {
  console.log("Server started on port 3000");
  await connect();
  console.log("Mongo db connected successfully!");
});