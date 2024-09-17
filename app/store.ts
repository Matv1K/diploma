import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "../features/modal/modalSlice";
import catalogSlice from "../features/catalog/catalogSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    catalog: catalogSlice,
  },
});
