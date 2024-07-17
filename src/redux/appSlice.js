import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBotLoading: false,
    isBotActive: true,
    feedbackGiven: false,
    helpRequired: undefined,
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
    setHelpRequired: (state, action) => {
      state.helpRequired = action.payload;
    },
  },
});

export const {
  setIsBotLoading,
  setIsBotActive,
  setFeedbackGiven,
  setHelpRequired,
} = appSlice.actions;

export default appSlice.reducer;
