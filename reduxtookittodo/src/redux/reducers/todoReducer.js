import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "http://localhost:5000";

const initialState = {
  alltodos: [],
  loading: false,
  error: "",
};

export const getallTodos = createAsyncThunk("getalltodos", async (token) => {
  const res = await axios.get(`${backendURL}/gettodo`, {
    headers: { Authorization: token },
  });
  return res.data;
});

export const createTodo = createAsyncThunk(
  "createtodos",
  async ({ token, todo }) => {
    const res = await axios.post(
      `${backendURL}/createtodo`,
      { todo },
      {
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    );
    return res.data;
  }
);

export const deletetodo = createAsyncThunk(
  "deletetodo",
  async ({ token, id }) => {
    const res = await axios.delete(`${backendURL}/delete/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    return res.data;
  }
);

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [getallTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [getallTodos.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = "";
        state.alltodos = action.payload;
      }
    },
    [createTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [createTodo.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = "Added Successfully";
        state.alltodos.push(action.payload.message);
      }
    },
    [deletetodo.pending]: (state, action) => {
      state.loading = true;
    },
    [deletetodo.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = "Deleted Successfully";
        state.alltodos = state.alltodos.filter(
          (todo) => todo._id !== action.payload._id
        );
      }
    },
  },
});

export const {} = todoReducer.actions;
export default todoReducer.reducer;
