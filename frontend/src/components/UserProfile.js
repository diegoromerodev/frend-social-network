import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deletePost, fetchFeed } from "../lib/api";
import FriendRequests from "./FriendRequests";
import Post from "./posts/Post";
import { toggleLoading } from "./slices/loadingSlice";
import ProfileHeader from "./utilities/ProfileHeader";

export default () => {
  const { userId } = useParams();
  const session = useSelector((state) => state.session.value);
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchFeed(session.token, userId, "user").then((data) => {
      if (!("_id" in data)) history.push("/");
      else setUser(data);
    });
    fetchFeed(session.token, userId).then((data) => {
      setPosts(data);
    });
  }, [userId]);
  const handleDelete = (postId, userId) => {
    dispatch(toggleLoading());
    deletePost(session.token, postId, userId).then(() => {
      dispatch(toggleLoading());
      history.push("/");
    });
  };
  return (
    <>
      <ProfileHeader user={user} session={session} />
      {userId === session?.user?._id && <FriendRequests />}
      {posts.map(
        (post) =>
          post.author && <Post post={post} handleDelete={handleDelete} />
      )}
    </>
  );
};
