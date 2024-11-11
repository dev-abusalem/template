import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// Optional: Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
