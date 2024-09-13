import express, { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";

import authMiddleware from "../../middlewares/authMiddleware";

import User from "../../models/User";

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

// TODO: DO NOT SEND PASSWORDS BACK TO THE CLIENT

const router = express.Router();

// ROUTE FOR USER REGISTRATION

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;

    console.log(req.body);

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, lastName });

    const savedUser = await user.save();

    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "30d" }
    );

    res.status(201).send({ user: savedUser, token });
  } catch (error) {
    console.error("Could not register", error);
    res.status(500).send("Something went wrong");
  }
});

// ROUTE FOR USER LOGIN

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send({ user, token });
  } catch (error) {
    console.error("Could not login", error);
    res.status(500).send("Something went wrong");
  }
});

// ROUTE FOR GETTING ALL USERS

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (error) {
    console.error("Could not get users", error);
    res.status(500).send("Something went wrong");
  }
});

// ROUTE FOR GETTING CURRENT USER

router.get("/my-user", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    if (!userId) {
      return res.status(404).send("User ID not found in token");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error("Could not get user", error);
    res.status(500).send("Something went wrong");
  }
});

export default router;
