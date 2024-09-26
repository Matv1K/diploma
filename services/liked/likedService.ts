import instance from '@/config/getAxiosInstance';

import { LikedItemI } from '@/types';

export const addLikedItem = async (likedItem: LikedItemI) => {
  try {
    const response = await instance.post('/liked', likedItem);

    return response.data;
  } catch (error) {
    console.error('Error creating liked item: ', error);
    throw error;
  }
};

export const getLikedItems = async () => {
  try {
    const response = await instance.get('/liked');
    return response.data;
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw error;
  }
};

export const getLikedItem = async (id: string | string[]) => {
  try {
    const response = await instance.get(`/liked/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw error;
  }
};

export const deleteLikedItem = async (id: string | string[]) => {
  try {
    const response = await instance.delete(`/liked/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item: ', error);
    throw error;
  }
};
