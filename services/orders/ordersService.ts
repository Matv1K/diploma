import instance from "@/config/getAxiosInstance";

import { OrderItemI } from "../../types";

export const createOrder = async (items: OrderItemI[]) => {
  try {
    const response = await instance.post("/orders", items);
    return response.data;
  } catch (error) {
    console.error("Error creating new order: ", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await instance.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error creating new order: ", error);
    throw error;
  }
};
