import Order from '../../models/Order';
import CartItem from '../../models/Cart-Item';

class OrderService {
  async createNewOrder(userId: string | undefined, items: any[], totalPrice: number) {
    const newOrder = new Order({ userId, items, status: 'in progress', totalPrice });
    await newOrder.save();

    if (newOrder) {
      await CartItem.deleteMany({ userId });
    }

    return newOrder;
  };

  async fetchUserOrders(userId: string | undefined) {
    const orders = await Order.aggregate([{ $match: { userId } }, { $sort: { createdAt: -1 } }]);
    return orders;
  }
}

export default new OrderService();
