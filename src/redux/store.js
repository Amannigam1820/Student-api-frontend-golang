// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
  },
});

export default store;
