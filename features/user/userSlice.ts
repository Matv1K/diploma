import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  registerUser,
  loginUser, getCurrentUser,
  logOut,
  updateCurrentUser,
  googleLoginUser,
} from '@/api/users/userService';

import { SignInDataI, SignUpDataI, ApiError, UserDataI, UpdatedUserDataI } from '@/types';

interface UserStateI {
  user: UserDataI | null;
  loading: boolean;
  error: string | null;
  token?: string;
}

const initialState: UserStateI = {
  user: null,
  loading: false,
  error: null,
};

const handleApiError = (error: ApiError): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return error.message || 'An unknown error occurred';
};

export const fetchCurrentUser =
  createAsyncThunk<UserDataI, void, { rejectValue: string }>('user/fetchCurrentUser',async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.response?.status === 401) {
        return rejectWithValue('User is not authorized');
      }

      return rejectWithValue(handleApiError(apiError));
    }
  });

export const signUp =
  createAsyncThunk<{ user: UserDataI; token: string }, SignUpDataI, { rejectValue: { message: string } }>('user/signUp',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await registerUser(userData);
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue({ message: apiError.message });
      }
    });

export const signIn =
  createAsyncThunk<UserDataI, SignInDataI, { rejectValue: { message: string } }>('user/signIn',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await loginUser(userData);
        return response;
      } catch (error) {
        const apiError = error as ApiError;

        return rejectWithValue({ message: apiError.message });
      }
    });

export const googleSignIn = createAsyncThunk('user/googleSignIn', async (token: string, { rejectWithValue }) => {
  try {
    const response = await googleLoginUser(token);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logOutUser =
  createAsyncThunk<void, void, { rejectValue: string }>('user/logOut', async (_, { rejectWithValue }) => {
    try {
      await logOut();
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(handleApiError(apiError));
    }
  });

export const updateUser =
  createAsyncThunk<UserDataI, Partial<UpdatedUserDataI>, { rejectValue: string }>('user/updateUser',
    async (updatedUserData, { rejectWithValue }) => {
      try {
        const response = await updateCurrentUser(updatedUserData);
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        return rejectWithValue(handleApiError(apiError));
      }
    });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserDataI>) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
        state.user = null;
      })

      .addCase(signUp.fulfilled, (state, action: PayloadAction<{ user: UserDataI; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })

      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserDataI>) => {
        state.user = action.payload;
      })

      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(logOutUser.fulfilled, state => {
        state.user = null;
        state.token = undefined;
        state.loading = false;
      })

      .addCase(logOutUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Log-out error';
        state.loading = false;
      })

      .addCase(updateUser.pending, state => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserDataI>) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
