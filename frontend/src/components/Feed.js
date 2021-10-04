import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../lib/api";
import Post from "./posts/Post";
import Status from "./posts/Status";
import { toggleLoading } from "./slices/loadingSlice";

export default () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const session = useSelector((state) => state.session.value);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!session) return;
    dispatch(toggleLoading());
    fetchFeed(session.token, session.user._id).then((data, error) => {
      setPosts(data);
      dispatch(toggleLoading());
    });
  }, [session]);
  return (
    <>
      <Status />
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
};
