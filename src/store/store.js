import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";
import usersReducer from "./usersSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer
  },
  middleware: [thunk, logger]
});
