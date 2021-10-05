import React from "react";
import { StyledIcon } from "../utilities/Misc";
import { BoldRegularLink, LikesContainer } from "../utilities/postElements";
import { FlexContainer } from "../utilities/SpaceContainers";

export default ({ numberOfLikes, numberOfComments, id }) => {
  return (
    <FlexContainer className="center-y spb-x padd-x padd-1-2">
      <LikesContainer>
        <StyledIcon className="fa-solid fa-heart" />
        &nbsp;{numberOfLikes} Like
        {numberOfLikes === 1 ? "" : "s"}
      </LikesContainer>

      <BoldRegularLink to={`/posts/${id}`}>
        {numberOfComments} comments
      </BoldRegularLink>
    </FlexContainer>
  );
};
