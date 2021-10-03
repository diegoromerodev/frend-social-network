import { configureStore } from "@reduxjs/toolkit";
import session from "./components/slices/sessionSlice";

export default configureStore({
  reducer: {
    session,
  },
});
