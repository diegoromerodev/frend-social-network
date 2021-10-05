import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deletePost } from "../../lib/api";
import Post from "../posts/Post";
import { toggleLoading } from "../slices/loadingSlice";

export default ({ post, query }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session.value);
  const handleDelete = (postId, userId) => {
    dispatch(toggleLoading);
    deletePost(session.token, postId, userId).then(() => {
      dispatch(toggleLoading);
      history.push("/");
    });
  };
  return (
    post.author && (
      <Post post={post} handleDelete={handleDelete} query={query} />
    )
  );
};
