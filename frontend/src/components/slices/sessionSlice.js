/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    value: "",
  },
  reducers: {
    writeSession(state, action) {
      localStorage.setItem("frends_session", JSON.stringify(action.payload));
      state.value = action.payload;
    },
    deleteSession(state) {
      localStorage.setItem("frends_session", "");
      state.value = "";
    },
    saveSession(state, action) {
      state.value = action.payload;
    },
  },
});

export const { saveSession, deleteSession, writeSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
