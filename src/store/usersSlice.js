import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditor: false,
  // allUsers: [449501],
  editors: [449501],
};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEditor: (state) => {
      state.isEditor = true;
    }
  },
});

export const { setEditor } = counterSlice.actions;

export default counterSlice.reducer;
