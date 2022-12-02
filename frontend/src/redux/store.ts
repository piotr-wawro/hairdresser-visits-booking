import { configureStore } from "@reduxjs/toolkit";
import { hvbApi } from "../api/index.js";
import { authReducer } from "./authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [hvbApi.reducerPath]: hvbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hvbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
