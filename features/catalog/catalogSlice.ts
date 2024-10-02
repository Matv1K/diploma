import { createSlice } from '@reduxjs/toolkit';

interface CatalogStateI {
  isCatalogOpen: boolean;
}

const initialState: CatalogStateI = {
  isCatalogOpen: false,
};

const catalogSlice = createSlice({
  name: 'сatalog',
  initialState,
  reducers: {
    openCatalog(state) {
      state.isCatalogOpen = true;
    },

    closeCatalog(state) {
      state.isCatalogOpen = false;
    },
  },
});

export const { closeCatalog, openCatalog } = catalogSlice.actions;
export default catalogSlice.reducer;
