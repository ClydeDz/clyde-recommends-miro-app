import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import appReducer from "./appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
  },
});
