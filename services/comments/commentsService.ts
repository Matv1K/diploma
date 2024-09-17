import instance from "@/config/getAxiosInstance";

export const createComment = async ({ description, rating }: any) => {
  try {
    const response = await instance.post("/comments", { description, rating });
    return response.data;
  } catch (error) {
    console.error("Could not create comment", error);
    throw error;
  }
};

export const getComments = async () => {
  try {
    const response = await instance.get("/comments");
    return response.data;
  } catch (error) {
    console.error("Could not create comment", error);
    throw error;
  }
};
