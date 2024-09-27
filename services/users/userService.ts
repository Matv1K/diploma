import instance from '@/config/getAxiosInstance';

export const registerUser = async ({ name, lastName, email, password }:
  { name: string; lastName: string; email: string; password: string; }) => {
  try {
    const response = await instance.post('/users/register', { name, lastName, email, password });

    localStorage.setItem('token', response.data.user.token);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    console.error('Something went wrong: ', error);
    throw error;
  }
};

export const loginUser = async ({ email, password }: {email: string, password: string}) => {
  try {
    const response = await instance.post('/users/login', { email, password });

    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    console.error('Something went wrong: ', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await instance.get('/users/my-user');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    throw error;
  }
};

export const updateCurrentUser = async (userData: any) => {
  try {
    const response = await instance.patch('/users/my-user', userData);
    return response.data;
  } catch (error) {
    console.error('Something went wrong: ', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await instance.delete('/users/logout');

    localStorage.removeItem('token');

    return response.data;
  } catch (error) {
    console.error('Something went wrong: ', error);
    throw error;
  }
};

export const resetPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await instance.post('/users/reset-password', { currentPassword, newPassword });
    return response;
  } catch (error) {
    console.error('Somehting went wrong', error);
  }
};
