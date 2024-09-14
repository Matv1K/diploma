import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import instrumentRoutes from "./routes/instruments/instrumentRoutes";
import userRoutes from "./routes/users/userRoutes";
import cartRoutes from "./routes/cart/cartRoutes";
import likedRoutes from "./routes/liked/likedRoutes";

dotenv.config();

const server = express();

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// DB CONNECTION
mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
  .then(() => console.log("MongoDB is connected"))
  .catch(() => console.log("Could not set the connection with MongoDB"));

// ROUTES
server.use("/instruments", instrumentRoutes);
server.use("/users", userRoutes);
server.use("/cart", cartRoutes);
server.use("/liked", likedRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}...`));
