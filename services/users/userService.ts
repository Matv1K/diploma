import instance from "@/config/getAxiosInstance";

// ADD REGISTER DATA INTERFACE TYPE

export const registerUser = async ({
  name,
  lastName,
  email,
  password,
}: {
  name: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await instance.post("/users/register", {
      name,
      lastName,
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await instance.post("/users/login", { email, password });

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

export const logOut = async () => {
  try {
    const response = await instance.delete("/users/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};
