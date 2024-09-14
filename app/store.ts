import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "../features/modal/modalSlice";
import catalogSlice from "../features/catalog/catalogSlice";
import userSlice from "@/features/user/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    catalog: catalogSlice,
    user: userSlice,
  },
});
