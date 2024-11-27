import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "usereducer",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userExists, userNotExist } = userReducer.actions;
