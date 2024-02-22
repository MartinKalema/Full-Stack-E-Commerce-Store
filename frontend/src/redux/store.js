import { configureStore } from "@reduxjs/toolkit"; // Create redux store
import { apiSlice } from "./api/apiSlice"; // Create API slice
import { setupListeners } from "@reduxjs/toolkit/query/react"; // Setup listeners for API slice
import authReducer from "./features/auth/authSlice"; // Create auth slice

// creating redux store.
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
