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
    addUserGeneral(state, action) {
      state.value.user[action.payload.field].push(action.payload.elId);
    },
    removeUserGeneral(state, action) {
      state.value.user[action.payload.field] = state.value.user[
        action.payload.field
      ].filter((el) => el !== action.payload.elId);
    },
  },
});

export const {
  saveSession,
  deleteSession,
  writeSession,
  addLike,
  addUserGeneral,
  removeUserGeneral,
} = sessionSlice.actions;

export default sessionSlice.reducer;
