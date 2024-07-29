import { configureStore,Store } from "@reduxjs/toolkit";
import petSlice from "./slices/petSlice/petSlice";

export const store:Store = configureStore({
  reducer: {
    petSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;