import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { registerUser, loginUser, getCurrentUser, logOut, updateCurrentUser } from '@/services/users/userService';

import { SignInDataI, SignUpDataI } from '@/types';

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    return rejectWithValue(`Failed to fetch user: ${error}`);
  }
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData: SignUpDataI, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error: any) {

      if (error.message) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('An unknown error occurred during sign-up');
    }
  },
);

export const signIn = createAsyncThunk('user/signIn', async (userData: SignInDataI, { rejectWithValue }) => {
  try {
    const response = await loginUser(userData);
    return response;
  } catch (error: any) {

    if (error.message) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(`Failed to sign in: ${error}`);
  }
});

export const logOutUser = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    const response = await logOut();
    return response;
  } catch (error) {
    return rejectWithValue(`Failed to log out: ${error}`);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (updatedUserData: any, { rejectWithValue }) => {
  try {
    const response = await updateCurrentUser(updatedUserData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to update user');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOutUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log('API Response:', action.payload);
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
