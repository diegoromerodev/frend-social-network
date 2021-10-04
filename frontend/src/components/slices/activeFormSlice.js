import { createSlice } from "@reduxjs/toolkit";

export const activeFormSlice = createSlice({
  name: "activeForm",
  initialState: {
    value: "",
  },
  reducers: {
    setActiveForm(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setActiveForm } = activeFormSlice.actions;
export default activeFormSlice.reducer;
