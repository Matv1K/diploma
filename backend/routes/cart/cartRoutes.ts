import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import authMiddleware from "../../middlewares/authMiddleware";

import Cart_Item from "../../models/Cart-Item";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, image, brandName, price, color, section, instrumentId } =
      req.body;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const cartItem = new Cart_Item({
      name,
      image,
      brandName,
      amount: 1,
      price,
      color,
      userId,
      section,
      instrumentId,
    });

    const newCartItem = cartItem.save();

    res.status(201).send(newCartItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const cartItems = await Cart_Item.find({ userId });

    res.status(200).send(cartItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/amount", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const cartItems = await Cart_Item.find({ userId });

    const cartItemsAmount = cartItems.length;

    res.status(200).send(cartItemsAmount);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
