import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComments, fetchFeed } from "../../lib/api";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentComment } from "../slices/currentCommentSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import { toggleLoading } from "../slices/loadingSlice";
import { blue, red } from "../utilities/colors";
import { StyledIcon, StyledRegularP } from "../utilities/Misc";
import { BoldRegularLink } from "../utilities/postElements";
import { FlexContainer } from "../utilities/SpaceContainers";

export default ({ handleLike, liked, comment, session, post }) => {
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (token, postId, commentId) => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    dispatch(toggleLoading());
    deleteComments(token, postId, commentId).then(() => {
      fetchFeed(token, postId, "post").then((data) => {
        dispatch(setCurrentPost(data));
        dispatch(toggleLoading());
        setConfirm(false);
      });
    });
  };

  const handleEdit = () => {
    dispatch(setCurrentPost(post));
    dispatch(setCurrentComment(comment));
    dispatch(setActiveForm("comment-edit"));
  };
  return (
    <FlexContainer className="padd-y">
      <BoldRegularLink
        to="#"
        onClick={handleLike}
        style={{
          color: liked && blue,
        }}
      >
        <StyledIcon
          className="fa-solid fa-thumbs-up"
          style={{
            color: liked && blue,
          }}
        />{" "}
        &nbsp; Like
      </BoldRegularLink>

      {(comment.author._id === session.user._id ||
        post.author._id === session.user._id) && (
        <>
          <StyledRegularP>-</StyledRegularP>
          <BoldRegularLink to="#" onClick={handleEdit}>
            <StyledIcon className="fa-solid fa-highlighter" />
            &nbsp; Edit
          </BoldRegularLink>
          <StyledRegularP>-</StyledRegularP>
          <BoldRegularLink
            to="#"
            onClick={() => handleDelete(session.token, post._id, comment._id)}
            style={{
              color: red,
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledIcon style={{ color: red }} className="fa-solid fa-xmark" />
            &nbsp; {!confirm ? "Delete" : "Are you sure?"}
          </BoldRegularLink>
        </>
      )}
    </FlexContainer>
  );
};
