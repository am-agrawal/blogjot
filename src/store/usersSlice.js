import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditor: false,
  // allUsers: [507850, 508014],
  editors: [507850],
};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEditor: (state) => {
      state.isEditor = true;
    },
    resetEditor: (state) => {
      state.isEditor = false;
    }
  },
});

export const { setEditor, resetEditor } = counterSlice.actions;

export default counterSlice.reducer;
