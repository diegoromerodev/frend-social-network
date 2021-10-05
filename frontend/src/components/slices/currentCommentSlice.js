import { createSlice } from "@reduxjs/toolkit";

export const currentCommentSlice = createSlice({
  name: "currentComment",
  initialState: {
    value: "",
  },
  reducers: {
    setCurrentComment(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setCurrentComment } = currentCommentSlice.actions;
export default currentCommentSlice.reducer;
