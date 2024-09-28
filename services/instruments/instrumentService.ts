import instance from '@/config/getAxiosInstance';

import { InstrumentI } from '@/types';

export const createInstrument = async (instrument: InstrumentI) => {
  try {
    const response = await instance.post('/instruments', instrument);
    return response.data;
  } catch (error) {
    console.error('Error creating instrument: ', error);
    throw error;
  }
};

export const getInstruments = async (page: number, limit: number = 10) => {
  try {
    const response = await instance.get(`/instruments?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments');
    throw error;
  }
};

export const getInstrument = async (id: string | string[]) => {
  try {
    const response = await instance.get(`/instruments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instrument', error);
    throw error;
  }
};

export const getInstrumentsOnSale = async () => {
  try {
    const response = await instance.get('/instruments/sale');
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments', error);
    throw error;
  }
};

export const getPopularIstruments = async () => {
  try {
    const response = await instance.get('/instruments/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments', error);
    throw error;
  }
};

export const getNewInstruments = async () => {
  try {
    const response = await instance.get('/instruments/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments', error);
    throw error;
  }
};

export const getInstrumentsBySection = async (section: string | string[], page: number = 1) => {
  try {
    const response = await instance.get(`/instruments/section/${section}`, {
      params: {
        page, // Send the page as a query parameter
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching instruments for section: ${section}`, error.message);
    throw new Error(`Failed to fetch instruments for section ${section}`);
  }
};

export const searchInstruments = async (query: string) => {
  try {
    const response = await instance.get(`/instruments/search/query?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Search failed', error);
    throw error;
  }
};

export const getInstrumentBySubtype = async (
  subtype: string | string[],
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const response = await instance.get(`/instruments/section/subtype/${subtype}`, {
      params: {
        page, // Send the page number as a query parameter
        limit, // Send the limit as a query parameter
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments', error);
    throw error;
  }
};

export const getInstrumentRating = async (instrumentId: string) => {
  try {
    const response = await instance.get(`/instruments/rating/${instrumentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching average rating', error);
  }
};
