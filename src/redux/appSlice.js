import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBotLoading: false,
    isBotActive: true,
    feedbackGiven: false,
    helpRequired: undefined,
    isThirdPartyOffline: false,
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
    setIsThirdPartyOffline: (state, action) => {
      state.isThirdPartyOffline = action.payload;
    },
  },
});

export const {
  setIsBotLoading,
  setIsBotActive,
  setFeedbackGiven,
  setHelpRequired,
  setIsThirdPartyOffline,
} = appSlice.actions;

export default appSlice.reducer;
