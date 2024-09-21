import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "@/features/modal/modalSlice";
import catalogSlice from "@/features/catalog/catalogSlice";
import instrumentsSlice from "@/features/instruments/instrumentsSlice";
import commentsSlice from "@/features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    catalog: catalogSlice,
    instruments: instrumentsSlice,
    comments: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
