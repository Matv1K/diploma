import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/services/users/userService";

interface Address {
  country: string;
  city: string;
  address: string;
}

interface User {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchCurrentUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
