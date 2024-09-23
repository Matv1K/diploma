import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authMiddleware from '../../middlewares/authMiddleware';

import Cart_Item from '../../models/Cart-Item';

import getTotalPrice from '../../utils/getTotalPrice';

const router = express.Router();

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, image, brandName, price, color, section, instrumentId } =
      req.body;

    const existingItem = await Cart_Item.findOne({
      instrumentId,
      userId: (req as any).payload?.id,
    });

    if (existingItem && existingItem.color === color) {
      return res.status(200).send('Instrument is already in the cart');
    }

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

    const newCartItem = await cartItem.save();

    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const cartItems = await Cart_Item.find({ userId }).lean();

    const formattedCartItems = cartItems.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));

    const totalPrice = getTotalPrice(formattedCartItems);

    res.status(200).json({ cartItems, length: cartItems.length, totalPrice });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/amount', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    const cartItems = await Cart_Item.find({ userId });

    const cartItemsAmount = cartItems.length;

    res.status(200).json(cartItemsAmount);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await Cart_Item.deleteOne({ _id: id });

    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  '/increase/:id',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await Cart_Item.updateOne({ _id: id }, { $inc: { amount: 1 } });

      res.status(200).json('Amount updated successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

router.post(
  '/decrease/:id',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await Cart_Item.updateOne({ _id: id }, { $inc: { amount: -1 } });

      res.status(200).json('Amount updated successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

export default router;
