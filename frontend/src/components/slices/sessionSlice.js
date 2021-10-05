/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { handleFriends } from "../../lib/api";

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
      handleFriends(
        state.value.token,
        "post",
        action.payload.field,
        state.value.user._id,
        action.payload.elId
      );
      state.value.user[action.payload.field].push(action.payload.elId);
    },
    removeUserGeneral(state, action) {
      handleFriends(
        state.value.token,
        "delete",
        action.payload.field,
        state.value.user._id,
        action.payload.elId
      );
      state.value.user[action.payload.field] = state.value.user[
        action.payload.field
      ].filter((el) => el !== action.payload.elId);
    },
    setAllRequests(state, action) {
      state.value.user.friends = action.payload.friends;
      state.value.user.sent_requests = action.payload.sent_requests;
      state.value.user.received_requests = action.payload.received_requests;
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
  setAllRequests,
} = sessionSlice.actions;

export default sessionSlice.reducer;
