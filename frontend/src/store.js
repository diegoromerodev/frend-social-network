import { configureStore } from "@reduxjs/toolkit";
import session from "./components/slices/sessionSlice";
import loading from "./components/slices/loadingSlice";
import activeForm from "./components/slices/activeFormSlice";

export default configureStore({
  reducer: {
    session,
    loading,
    activeForm,
  },
});
