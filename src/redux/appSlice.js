import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBotLoading: false,
  },
  reducers: {
    setIsBotLoading: (state, action) => {
      state.isBotLoading = action.payload;
    },
  },
});

export const { setIsBotLoading } = appSlice.actions;

export default appSlice.reducer;
