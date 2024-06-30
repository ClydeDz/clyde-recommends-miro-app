import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerms: "",
    searchKeywords: [],
  },
  reducers: {
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchKeywords: (state, action) => {
      state.searchKeywords = action.payload;
    },
  },
});

export const { setSearchTerms, setSearchKeywords } = searchSlice.actions;

export default searchSlice.reducer;
