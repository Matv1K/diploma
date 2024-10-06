import instance from '@/config/getAxiosInstance';

import { OrderItemI } from '@/types';

interface OrderPayload {
  items: OrderItemI[],
  totalPrice: number,
  address: {
    country: string,
    city: string,
    address: string,
  },
  phoneNumber: string,
}

export const createOrder = async (orderPayload: OrderPayload) => {
  try {
    const response = await instance.post('/orders', orderPayload);
    return response.data;
  } catch (error) {
    console.error('Error creating new order: ', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await instance.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error creating new order: ', error);
    throw error;
  }
};
