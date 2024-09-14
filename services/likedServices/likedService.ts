import instance from "@/config/getAxiosInstance";

export const addLikedItem = async (likedItemData: any) => {
  try {
    const response = await instance.post("/liked", likedItemData);
    return response.data;
  } catch (error) {
    console.error("Error creating liked item: ", error);
    throw error;
  }
};

export const getLikedItems = async () => {
  try {
    const response = await instance.get("/liked");
    return response.data;
  } catch (error) {
    console.error("Error fetching items: ", error);
    throw error;
  }
};
