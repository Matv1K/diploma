import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action: any) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
