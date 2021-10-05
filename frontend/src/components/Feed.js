import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchFeed } from "../lib/api";
import Post from "./posts/Post";
import Status from "./posts/Status";
import { toggleLoading } from "./slices/loadingSlice";

export default ({ reloadFeed, setReloadFeed }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const session = useSelector((state) => state.session.value);
  useEffect(() => {
    if (!session) return;
    dispatch(toggleLoading());
    fetchFeed(session.token, session.user._id).then((data, error) => {
      setPosts(data);
      dispatch(toggleLoading());
      window.scrollTo(0, 0);
    });
  }, [session, reloadFeed]);
  const handleDelete = (postId, userId) => {
    dispatch(toggleLoading);
    deletePost(session.token, postId, userId).then(() => {
      dispatch(toggleLoading);
      setReloadFeed(Date.now());
    });
  };
  return (
    <>
      <Status />
      {posts.map((post) => (
        <Post key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </>
  );
};
