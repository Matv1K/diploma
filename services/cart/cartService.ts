import instance from "@/config/getAxiosInstance";

import { CartItemI } from "@/types";

export const addCartItem = async (cartItem: CartItemI) => {
  try {
    const response = await instance.post("/cart", cartItem);
    return response.data;
  } catch (error) {
    console.error("Error creating cart item: ", error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await instance.get("/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching items: ", error);
    throw error;
  }
};

export const getCartItemsAmount = async () => {
  try {
    const response = await instance.get("/cart/amount");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items amount: ", error);
    throw error;
  }
};

export const removeCartItem = async (id: string) => {
  try {
    const response = await instance.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart item: ", error);
    throw error;
  }
};

export const increaseAmount = async (id: string) => {
  try {
    const response = await instance.post(`/cart/increase/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error increasing amount: ", error);
    throw error;
  }
};

export const decreaseAmount = async (id: string) => {
  try {
    const response = await instance.post(`/cart/decrease/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error decreasing amount: ", error);
    throw error;
  }
};

export const removeCartItems = () => {};
