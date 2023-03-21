import { createStore } from "redux";

const initialState = {
  username: null,
  blogs: [],
  myBlogs: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return {};
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
