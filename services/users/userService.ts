import instance from "@/config/getAxiosInstance";

// ADD REGISTER DATA INTERFACE TYPE

export const registerUser = async (data: any) => {
  try {
    const response = await instance.post("/users/register", data);

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await instance.post("/users/login", data);

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await instance.get("/users/my-user");
    return response.data;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};
