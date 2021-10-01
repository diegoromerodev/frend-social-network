import React from "react";
import { RegularButton } from "../utilities/FormElements";
import { PostWrapper } from "../utilities/postElements";
import {
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default () => {
  return (
    <PostWrapper>
      <FlexContainer>
        <FlexColumnGrowElementCenter className="gap-y">
          <a href="https://github.com/diegoromerodev">
            <RegularButton className="blue">Visit my github</RegularButton>
          </a>
          <RegularButton>Like post</RegularButton>
          <RegularButton>Comment on post</RegularButton>
          <RegularButton className="red">Log out</RegularButton>
        </FlexColumnGrowElementCenter>
      </FlexContainer>
    </PostWrapper>
  );
};
