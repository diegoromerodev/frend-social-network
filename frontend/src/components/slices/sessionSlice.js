/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    value: "",
  },
  reducers: {
    saveSession: (state, action) => {
      localStorage.setItem("frends_session", JSON.stringify(action.payload));
      state.value = action.payload;
    },
    deleteSession: (state) => {
      localStorage.setItem("frends_session", "");
      state.value = "";
    },
  },
});

export const { saveSession, deleteSession } = sessionSlice.actions;

export default sessionSlice.reducer;
