import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import todoReducer from "./reducers/todoReducer";

const store = configureStore({
  reducer: {
    user: authReducer,
    todos:todoReducer
  },
});

export default store;
