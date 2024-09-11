import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    showModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
