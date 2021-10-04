import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    toggleLoading(state) {
      state.value = !state.value;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
