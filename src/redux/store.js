import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import appReducer from "./appSlice";
import recommendationReducer from "./recommendationSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    recommendation: recommendationReducer,
  },
});
