import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';

import OrderController from '../../controllers/orderController';

const router = express.Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getOrders);

export default router;
