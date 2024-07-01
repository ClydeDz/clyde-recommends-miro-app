import { createSlice } from "@reduxjs/toolkit";

export const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    recommendedTemplate: {},
  },
  reducers: {
    setRecommendedTemplate: (state, action) => {
      state.recommendedTemplate = { ...action.payload };
    },
  },
});

export const { setRecommendedTemplate } = recommendationSlice.actions;

export default recommendationSlice.reducer;
