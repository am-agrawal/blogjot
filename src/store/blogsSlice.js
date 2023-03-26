import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  myBlogs: [],
};

export const counterSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, data) => {
      state.allBlogs = [...data.payload, ...state.allBlogs];
    },
    setMyBlogs: (state, data) => {
      state.myBlogs = [...data.payload, ...state.myBlogs];
    },
    overWrite: (state, data) => {
      state.allBlogs = data.payload.allBlogs;;
      state.myBlogs = data.payload.myBlogs;
    },
    clearBlogs: (state) => {
      state.myBlogs = [];
      state.allBlogs = [];
    },
  },
});

export const { setBlogs, setMyBlogs, overWrite, clearBlogs } =
  counterSlice.actions;

export default counterSlice.reducer;
