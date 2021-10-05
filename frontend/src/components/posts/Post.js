import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentSection from "./CommentSection";

import {
  PostBody,
  PostHeader,
  PostImage,
  PostLink,
  PostWrapper,
} from "../utilities/postElements";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import WriteAComment from "./WriteAComment";
import PostActions from "./PostActions";
import NumberOfPostLikes from "./NumberOfPostLikes";
import { highlight } from "../search/Search";

export default ({ post, handleDelete, query }) => {
  const [comments, setComments] = useState([]);
  const session = useSelector((state) => state.session.value);
  const currentPost = useSelector((state) => state.currentPost.value);
  const [postData, setPostData] = useState(post);
  const [numberOfLikes, setNumberOfLikes] = useState(postData.likes.length);
  const dispatch = useDispatch();

  const handleComment = () => {
    dispatch(setCurrentPost(post));
    dispatch(setActiveForm("comment"));
  };

  const handleDots = () => {
    dispatch(setCurrentPost(postData));
    dispatch(setActiveForm("post-more"));
  };

  useEffect(() => {
    if (currentPost._id === post._id) {
      console.log(postData);
      setPostData({ ...currentPost });
      setComments([...currentPost.comments]);
      return;
    }
    setPostData(postData);
    setComments(postData.comments);
  }, [currentPost]);
  return (
    <PostWrapper className="up-motion">
      {post.author && (
        <PostHeader
          image={post.author.profile_photo}
          username={post.author.full_name}
          date={postData.formatted_creation}
          heading={postData.heading}
          handleDots={handleDots}
          id={post.author._id}
        />
      )}
      {postData.text && (
        <PostBody to={`/posts/${post._id}`}>
          {highlight(postData.text, query)}
        </PostBody>
      )}
      {postData.image && (
        <PostLink to={`/posts/${postData._id}`} image={postData.url_formatter}>
          <PostImage src={postData.url_formatter} />
        </PostLink>
      )}
      <NumberOfPostLikes
        numberOfLikes={numberOfLikes}
        numberOfComments={postData.comments.length}
        id={postData._id}
      />
      <PostActions
        handleComment={handleComment}
        post={post}
        session={session}
        handleDelete={handleDelete}
        setNumberOfLikes={setNumberOfLikes}
      />
      {comments && <CommentSection comments={comments} post={postData} />}
      <WriteAComment user={session.user} handleComment={handleComment} />
    </PostWrapper>
  );
};
