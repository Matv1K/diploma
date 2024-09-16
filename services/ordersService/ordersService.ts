import instance from "@/config/getAxiosInstance";

export const createOrder = async (items: any) => {
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
