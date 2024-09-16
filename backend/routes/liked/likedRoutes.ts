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
    const { name, image, brandName, price, colors, section, instrumentId } =
      req.body;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const likedItem = new Liked_Item({
      name,
      image,
      brandName,
      amount: 1,
      price,
      colors,
      userId,
      section,
      instrumentId,
    });

    const newLikedItem = likedItem.save();

    res.status(201).json(newLikedItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const likedItems = await Liked_Item.find({ userId });

    res.status(200).json(likedItems);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id: instrumentId } = req.params;

    let isLiked = false;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const likedItem = await Liked_Item.findOne({
      userId,
      instrumentId,
    });

    if (likedItem) {
      isLiked = true;
    }

    res.status(200).json(isLiked);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id: instrumentId } = req.params;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const deletedItem = await Liked_Item.deleteOne({
      userId,
      instrumentId,
    });

    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
