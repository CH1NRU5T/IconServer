import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../features/iconSlice";
export const store = configureStore({
  reducer: promptReducer,
});
