import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBotLoading: false,
    isBotActive: true,
    feedbackGiven: false,
  },
  reducers: {
    setIsBotLoading: (state, action) => {
      state.isBotLoading = action.payload;
    },
    setIsBotActive: (state, action) => {
      state.isBotActive = action.payload;
    },
    setFeedbackGiven: (state, action) => {
      state.feedbackGiven = action.payload;
    },
  },
});

export const { setIsBotLoading, setIsBotActive, setFeedbackGiven } =
  appSlice.actions;

export default appSlice.reducer;
