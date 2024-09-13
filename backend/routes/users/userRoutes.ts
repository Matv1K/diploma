import express, { Request, Response } from "express";

import bcrypt from "bcrypt";

import { validationResult } from "express-validator";

import User from "../../models/User";

const router = express.Router();

// ROUTE FOR USER REGISTRATION

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;

    const user = new User({ name, email, password, lastName });

    const savedUser = user.save();

    res.status(201).send(savedUser);
  } catch (error) {
    console.error("Could not register", error);
    res.status(500).send("Something went wrong");
  }
});

// ROUTE FOR USER LOGIN

router.post("/login", (req, res) => {
  try {
    console.log(req.body);
    res.status(201).send("user logged in");
  } catch (error) {
    console.error("Could not login", error);
    res.status(500).send("Something went wrong");
  }
});

// ROUTE FOR GETTING ALL USERS

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(201).send(users);
  } catch (error) {
    console.error("Could not get users", error);
    res.status(500).send("Something went wrong");
  }
});

export default router;
