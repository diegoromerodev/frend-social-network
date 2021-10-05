import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveForm } from "../slices/activeFormSlice";
import { RegularButton, RoundedInputButton } from "../utilities/FormElements";
import { ImageForContainer, Separator, StyledIcon } from "../utilities/Misc";
import { PostWrapper } from "../utilities/postElements";
import { CircleContainer, FlexContainer } from "../utilities/SpaceContainers";

export default () => {
  const session = useSelector((state) => state.session.value);
  const dispatch = useDispatch();
  return (
    <PostWrapper>
      <FlexContainer>
        <CircleContainer>
          <ImageForContainer src={session && session.user.profile_photo} />
        </CircleContainer>
        <RoundedInputButton
          onClick={() => dispatch(setActiveForm("emotion-post"))}
        >
          What&apos;s on your mind, {session && session.user.first_name}?
        </RoundedInputButton>
      </FlexContainer>
      <Separator />
      <FlexContainer className="wrap">
        <RegularButton
          className="transparent"
          onClick={() => dispatch(setActiveForm("image-post"))}
          style={{ color: "#7DCE82" }}
        >
          <StyledIcon
            className="fa-solid fa-image"
            style={{ color: "#7DCE82" }}
          />
          &nbsp; Create image post
        </RegularButton>
        <RegularButton
          className="blue mobile-last"
          onClick={() => dispatch(setActiveForm("text-post"))}
        >
          <StyledIcon className="fa-solid fa-align-left white" />
          &nbsp; Create text post
        </RegularButton>
        <RegularButton
          className="transparent"
          onClick={() => dispatch(setActiveForm("emotion-post"))}
          style={{ color: "#FED99B" }}
        >
          <StyledIcon
            style={{ color: "#FED99B" }}
            className="fa-solid fa-face-grin-stars"
          />
          &nbsp; Create emotion post
        </RegularButton>
      </FlexContainer>
    </PostWrapper>
  );
};
