import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCatalogOpen: false,
};

const catalogSlice = createSlice({
  name: "Catalog",
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
