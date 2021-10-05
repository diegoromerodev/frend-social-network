import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import { RegularButton } from "../utilities/FormElements";
import { PostWrapper } from "../utilities/postElements";
import {
  BigContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default () => {
  const session = useSelector((state) => state.session.value);
  const currentPost = useSelector((state) => state.currentPost.value);
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setActiveForm("post-edit"));
  };
  const handleClose = () => {
    dispatch(setActiveForm(""));
    dispatch(setCurrentPost(""));
  };
  return (
    <BigContainer>
      <PostWrapper>
        <FlexContainer>
          <FlexColumnGrowElementCenter className="gap-y">
            {session.user.id === currentPost.author._id && (
              <RegularButton onClick={handleEdit}>Edit post</RegularButton>
            )}
            <a
              target="_blank"
              style={{ flexGrow: 1, display: "flex", textDecoration: "none" }}
              href="https://github.com/diegoromerodev"
              rel="noreferrer"
            >
              <RegularButton className="blue">Visit my github</RegularButton>
            </a>
            <RegularButton className="red" onClick={handleClose}>
              Cancel
            </RegularButton>
          </FlexColumnGrowElementCenter>
        </FlexContainer>
      </PostWrapper>
    </BigContainer>
  );
};
