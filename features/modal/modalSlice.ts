import { createSlice } from '@reduxjs/toolkit/react';

interface ModalStateI {
  isOpen: boolean;
}

const initialState: ModalStateI = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
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
