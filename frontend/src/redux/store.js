import { configureStore } from "@reduxjs/toolkit"; // Create redux store
import { apiSlice } from "./api/apiSlice"; // Import API slice
import { setupListeners } from "@reduxjs/toolkit/query/react"; // Setup listeners for API slice
import authReducer from "./features/auth/authSlice"; // import auth slice

// creating redux store.
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Working with RTK Query
    auth: authReducer, // Working with RTK only
  },
  // middleware to help with the caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch); // Setup Listeners to dispatch actions for Cache updates.

export default store;
