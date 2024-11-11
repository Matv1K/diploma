import { Request, Response } from 'express';

import OrderService from '../services/order/orderService';

import Instrument from '../models/Instrument';

interface AuthenticatedRequest extends Request {
  payload?: { id: string };
}

class OrderController {
  async createOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const { items, totalPrice, address, phoneNumber } = req.body;

      const userId = req.payload?.id || '';

      const newOrder = await OrderService.createNewOrder(userId, items, totalPrice, address, phoneNumber);

      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json('Something went wrong');
    }
  };

  async getOrders(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.payload?.id;

      if (!userId) {
        return res.status(500).json('No user id');
      }

      const orders = await OrderService.fetchUserOrders(userId);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json('Something went wrong');
    }
  };
}

export default new OrderController();
