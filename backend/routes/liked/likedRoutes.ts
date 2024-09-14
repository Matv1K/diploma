import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import authMiddleware from "../../middlewares/authMiddleware";

import Liked_Item from "../../models/Liked-Item";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, image, brandName, price, color, section, instrumentId } =
      req.body;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const likedItem = new Liked_Item({
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

    const newLikedItem = likedItem.save();

    res.status(201).send(newLikedItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const likedItems = await Liked_Item.find({ userId });

    res.status(200).send(likedItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
