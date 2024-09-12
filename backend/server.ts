import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import instrumentRoutes from "./routes/instrumentRoutes";

dotenv.config();

const server = express();

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// DB CONNECTION
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDB is connected"))
  .catch(() => console.log("Could not set the connection with MongoDB"));

server.use("/instruments", instrumentRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}...`));
