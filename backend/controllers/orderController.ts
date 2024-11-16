import { Request, Response } from 'express';
import Stripe from 'stripe';

import Instrument from '../models/Instrument';

import OrderService from '../services/order/orderService';

interface AuthenticatedRequest extends Request {
  payload?: { id: string };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' } as any);

class OrderController {
  async createOrder(req: AuthenticatedRequest, res: Response) {
    const { items, totalPrice, address, phoneNumber } = req.body;
    const userId = req.payload?.id || '';

    try {
      if (!items || !totalPrice || !address || !phoneNumber) {
        return res.status(400).json({ message: 'Invalid request data' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const newOrder = await OrderService.createNewOrder(userId, items, totalPrice, address, phoneNumber);

      const updatePromises = items.map(item =>
        Instrument.updateOne({ _id: item.instrumentId }, { $inc: { bought: item.amount } }));

      await Promise.all(updatePromises);

      res.status(201).json({ newOrder, clientSecret: paymentIntent.client_secret });

    } catch (error) {
      if (error.type === 'StripeCardError') {
        return res.status(400).json({ message: `Payment failed: ${error.message}` });
      }

      console.error('Error processing order:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

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

  async verifyOrderedItem(req: Request, res: Response) {
    try {
      const { instrumentId } = req.body;
      const userId = req.payload?.id;

      if (!userId) {
        return res.status(500).json('No user id');
      }

      const orders = await OrderService.fetchUserOrders(userId);

      const hasInstrument = orders.some(order =>
        order.items.some(item => item.instrumentId === instrumentId));

      res.status(200).json(hasInstrument);
    } catch (error) {
      console.error(error);
      res.status(500).json('Something went wrong');
    }
  }
}

export default new OrderController();
