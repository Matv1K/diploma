import instance from "@/config/getAxiosInstance";

export const addCartItem = async (cartItemData: any) => {
  try {
    const response = await instance.post("/cart", cartItemData);
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

export const removeCartItems = () => {};
