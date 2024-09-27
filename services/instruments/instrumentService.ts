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

export const getInstruments = async () => {
  try {
    const response = await instance.get('/instruments');
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

export const getInstrumentsBySection = async (section: string | string[]) => {
  try {
    const response = await instance.get(`/instruments/section/${section}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments', error);
    throw error;
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

export const getInstrumentBySubtype = async (subtype: string | string[]) => {
  try {
    const response = await instance.get(`/instruments/section/subtype/${subtype}`);
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
