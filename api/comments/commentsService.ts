import instance from '@/config/getAxiosInstance';

export const createComment = async ({ description, rating, instrumentId }:
  { description: string, rating: number, instrumentId: string }) => {
  try {
    const response = await instance.post(`/comments/${instrumentId}`, {
      description,
      rating,
    });
    return response.data;
  } catch (error) {
    console.error('Could not create comment', error);
    throw error;
  }
};

export const getComments = async (instrumentId: string) => {
  try {
    const response = await instance.get(`/comments/${instrumentId}`);
    return response.data;
  } catch (error) {
    console.error('Could not create comment', error);
    throw error;
  }
};
