import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginUser as loginUserService } from '@/services/users/userService';

import { SignInDataI } from '@/types';

export const loginUser = createAsyncThunk('auth/loginUser',
  async ({ email, password }: SignInDataI, { rejectWithValue }) => {
    try {
      const response = await loginUserService({ email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || 'Failed to log in');
    }
  });

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;