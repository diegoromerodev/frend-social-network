import { createSlice } from "@reduxjs/toolkit";

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    value: "",
  },
  reducers: {
    setCurrentPost(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setCurrentPost } = currentPostSlice.actions;

export default currentPostSlice.reducer;
