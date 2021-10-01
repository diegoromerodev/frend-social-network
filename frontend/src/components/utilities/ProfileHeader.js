import React from "react";
import { RegularButton } from "./FormElements";
import { ImageForContainer, StyledRegularP } from "./Misc";
import { PostWrapper } from "./postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./SpaceContainers";

export default () => {
  return (
    <PostWrapper>
      <FlexContainer>
        <FlexColumnGrowElementCenter className="center gap-y">
          <CircleContainer className="large">
            <ImageForContainer src="https://puestoviejoestancia.com.ar/l/glamping/wp-content/uploads/2014/10/speaker-2-v2.jpg" />
          </CircleContainer>
          <StyledRegularP className="large">John Doe</StyledRegularP>
          <FlexContainer className="padd-0">
            <RegularButton className="blue">Add as a friend</RegularButton>
            <RegularButton>Send message</RegularButton>
          </FlexContainer>
        </FlexColumnGrowElementCenter>
      </FlexContainer>
    </PostWrapper>
  );
};
