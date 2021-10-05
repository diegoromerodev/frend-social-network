import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deletePost, fetchFeed } from "../lib/api";
import Post from "./posts/Post";
import { toggleLoading } from "./slices/loadingSlice";

export default () => {
  const history = useHistory();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.value);
  const handleDelete = (delId, userId) => {
    dispatch(toggleLoading());
    deletePost(session.token, delId, userId).then(() => {
      dispatch(toggleLoading());
      history.push("/");
    });
  };
  useEffect(() => {
    dispatch(toggleLoading());
    fetchFeed(session.token, postId, "post").then((data) => {
      if (!data._id) return history.push("/");
      setPost(data);
      dispatch(toggleLoading());
    });
  }, [postId]);
  return post && <Post post={post} handleDelete={handleDelete} />;
};
