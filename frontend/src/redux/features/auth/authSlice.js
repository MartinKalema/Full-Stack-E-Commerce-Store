import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// Slice is a part of the store
const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers are the methods used to update the state.
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      );
      localStorage.setItem("expirationDate", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

// With redux, you can directly mutate the state.
// e.g state.value += 1 instead of using a method to set the state
// This is because redux uses immer under the hood to make the state immutable.

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
