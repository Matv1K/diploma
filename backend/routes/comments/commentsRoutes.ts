import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Comment from "../../models/Comment";
import User from "../../models/User";

import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

router.post("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { description, rating } = req.body;
    const { id: instrumentId } = req.params;

    const userId = (req as AuthenticatedRequest).payload?.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("NO USER");
    }

    const newComment = new Comment({
      instrumentId,
      description,
      rating,
      userName: user.name,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id: instrumentId } = req.params;

    const comments = await Comment.aggregate([
      { $match: { instrumentId } },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json(error);
  }
});

export default router;
