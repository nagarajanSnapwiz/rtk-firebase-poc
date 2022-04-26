import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./FirebaseRTKQuery";

export const store = configureStore({
  reducer: {
    [testApi.reducerPath]: testApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware)
});
