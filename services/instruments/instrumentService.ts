import instance from "@/config/getAxiosInstance";

// CREATE types FOLDER THAT INCLUDES ALL THE TYPES TO USE AS DATA INTERFACES HERE

export const createInstrument = async (instrumentData: any) => {
  try {
    const response = await instance.post("/instruments", instrumentData);
    return response.data;
  } catch (error) {
    console.error("Error creating instrument: ", error);
    throw error;
  }
};

export const getInstruments = async () => {
  try {
    const response = await instance.get("/instruments");
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments");
    throw error;
  }
};

export const getInstrument = async (id: any) => {
  try {
    const response = await instance.get(`/instruments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching instrument", error);
    throw error;
  }
};

export const getInstrumentsOnSale = async () => {
  try {
    const response = await instance.get("/instruments/sale");
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments", error);
    throw error;
  }
};

export const getPopularIstruments = async () => {
  try {
    const response = await instance.get("/instruments/popular");
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments", error);
    throw error;
  }
};

export const getNewInstruments = async () => {
  try {
    const response = await instance.get("/instruments/new");
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments", error);
    throw error;
  }
};

export const getInstrumentsBySection = async (section: any) => {
  try {
    const response = await instance.get(`/instruments/section/${section}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments", error);
    throw error;
  }
};
