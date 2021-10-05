import { configureStore } from "@reduxjs/toolkit";
import session from "./components/slices/sessionSlice";
import loading from "./components/slices/loadingSlice";
import activeForm from "./components/slices/activeFormSlice";
import currentPost from "./components/slices/currentPostSlice";
import currentComment from "./components/slices/currentCommentSlice";
import realTime from "./components/slices/realTimeSlice";

export default configureStore({
  reducer: {
    session,
    loading,
    activeForm,
    currentPost,
    currentComment,
    realTime,
  },
});
