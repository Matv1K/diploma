import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Order from "../../models/Order";
import CartItem from "../../models/Cart-Item";

import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { items, totalPrice } = req.body;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const newOrder = new Order({
      userId,
      items,
      status: "in progress",
      totalPrice,
    });

    await newOrder.save();

    if (newOrder) {
      await CartItem.deleteMany({ userId });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const myOrders = await Order.find({ userId });

    res.status(201).json(myOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

export default router;
