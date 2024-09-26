import { Request, Response } from 'express';

import CartService from '../services/cart/cartService';

class CartController {
  async addCartItem(req: Request, res: Response) {
    try {
      const userId = req.payload?.id;
      const result = await CartService.addCartItem(req.body, userId);

      return res.status(result.status).json(result.data || result.message);
    } catch (error: any) {
      console.error('Error adding item to cart', error);

      if (error.message === 'Item is already in the cart') {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Error adding item to cart' });
    }
  }

  async getCartItems(req: Request, res: Response) {
    try {
      const userId = req.payload?.id;
      const { cartItems, totalPrice } = await CartService.getCartItems(userId);

      return res.status(200).json({ cartItems, totalPrice });
    } catch (error) {
      console.error('Error retrieving cart items', error);
      return res.status(500).json({ message: 'Error retrieving cart items' });
    }
  }

  async getCartItemsAmount(req: Request, res: Response) {
    try {
      const userId = req.payload?.id;
      const cartItemsAmount = await CartService.getCartItemsAmount(userId);

      return res.status(200).json({ cartItemsAmount });
    } catch (error) {
      console.error('Error retrieving cart items amount', error);
      return res.status(500).json({ message: 'Error retrieving cart items amount' });
    }
  }

  async deleteCartItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CartService.deleteCartItem(id);

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      console.error('Error deleting cart item', error);
      return res.status(500).json({ message: 'Error deleting cart item' });
    }
  }

  async increaseCartItemAmount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CartService.increaseCartItemAmount(id);

      return res.status(200).json({ message: 'Cart item quantity increased' });
    } catch (error) {
      console.error('Error increasing cart item quantity', error);
      return res.status(500).json({ message: 'Error increasing cart item quantity' });
    }
  }

  async decreaseCartItemAmount(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // FIX getCartItemsAmount

      // const cartItem = await CartService.getCartItemsAmount(id);

      // if (cartItem <= 1) {
      //   return res.status(400).json({ message: 'Cart item amount cannot be less than 1' });
      // }

      await CartService.decreaseCartItemAmount(id);
      return res.status(200).json({ message: 'Cart item quantity decreased' });
    } catch (error) {
      console.error('Error decreasing cart item quantity', error);
      return res.status(500).json({ message: 'Error decreasing cart item quantity' });
    }
  }
}

export default new CartController();
