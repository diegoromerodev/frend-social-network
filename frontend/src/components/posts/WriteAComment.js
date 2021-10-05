import React from "react";
import { RoundedInputButton } from "../utilities/FormElements";
import { ImageForContainer } from "../utilities/Misc";
import { CircleContainer, FlexContainer } from "../utilities/SpaceContainers";

export default ({ user, handleComment }) => {
  return (
    <FlexContainer>
      <CircleContainer>
        <ImageForContainer src={user.profile_photo} />
      </CircleContainer>
      <RoundedInputButton onClick={handleComment}>
        Write a comment...
      </RoundedInputButton>
    </FlexContainer>
  );
};
