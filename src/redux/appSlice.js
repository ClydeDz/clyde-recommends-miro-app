import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBotLoading: false,
    isBotActive: true,
  },
  reducers: {
    setIsBotLoading: (state, action) => {
      state.isBotLoading = action.payload;
    },
    setIsBotActive: (state, action) => {
      state.isBotActive = action.payload;
    },
  },
});

export const { setIsBotLoading, setIsBotActive } = appSlice.actions;

export default appSlice.reducer;
