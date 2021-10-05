import { createSlice } from "@reduxjs/toolkit";

export const realTimeSlice = createSlice({
  name: "realTime",
  initialState: {
    notifications: [],
    chatrooms: [],
  },
  reducers: {
    setField(state, action) {
      state[action.payload.field] = action.payload.data;
    },
  },
});

export const { setField } = realTimeSlice.actions;

export default realTimeSlice.reducer;
