import { telBookReducers } from "./telBookReducers";

import { configureStore } from "@reduxjs/toolkit";

const { reducer } = telBookReducers;

const store = configureStore({
  reducer: reducer,
});

export default store;
