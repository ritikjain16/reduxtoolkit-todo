import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "http://localhost:5000";
const initialState = {
  token: "",
  loading: false,
  error: "",
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  const res = await axios.post(`${backendURL}/signup`, body);
  return res;
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  const res = await axios.post(`${backendURL}/signin`, body);
  return res;
});

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("react_redux_toolkit_todo_app_token");
    },
    removeToken: (state, action) => {
      localStorage.removeItem("react_redux_toolkit_todo_app_token");
      state.token = "";
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data.error) {
        state.error = action.payload.data.error;
      } else {
        state.error = action.payload.data.message;
      }
    },

    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },

    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data.error) {
        state.error = action.payload.data.error;
      } else {
        state.error = "Sign in success!!";
        state.token = action.payload.data.token;
        localStorage.setItem(
          "react_redux_toolkit_todo_app_token",
          action.payload.data.token
        );
      }
    },

    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { addToken, removeToken } = authReducer.actions;
export default authReducer.reducer;
