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

export const getInstruments = async (
  page: number,
  limit: number = 10,
  filters: { isNewOnly?: boolean; priceRange?: string; brand?: string; filter?: string } = {},
  type: 'shop' | 'sale' | 'sectionName' | 'subtypeName' = 'shop',
  sectionName?: string,
  subtypeName?: string,
) => {
  try {
    const params = new URLSearchParams();

    params.append('page', page.toString());
    params.append('limit', limit.toString());
    params.append('type', type);

    if (sectionName) params.append('section', sectionName);
    if (subtypeName) params.append('instrumentType', subtypeName);
    if (filters.isNewOnly) params.append('isNew', 'true');
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.filter) params.append('filter', filters.filter);

    const response = await instance.get(`/instruments?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments');
    throw error;
  }
};

export const getInstrument = async (id: string) => {
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
  }
};

export const getInstrumentsBySection = async (section: string, page: number = 1) => {
  try {
    const response = await instance.get(`/instruments/section/${section}`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching instruments for section: ${section}`, error);

  }
};

export const getInstrumentsByBrand = async (brand: string) => {
  try {
    const response = await instance.get(`/instruments/brands/${brand}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instruments by brand:', error);
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

export const getInstrumentBySubtype = async (subtype: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await instance.get(`/instruments/section/subtype/${subtype}`, { params: { page, limit } });
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
